/* eslint-disable @typescript-eslint/restrict-template-expressions */
import fs from 'fs'
import readline from 'readline'
import { CustomerRepository } from '../db/mongodb/customer/customer-repository'
import { TransactionRepository } from '../db/mongodb/transaction/transaction-repository'

export class TransactionProcessorRepository {
  private readonly customerCache = new Map<string, string>();
  private readonly seenTransactions = new Set<string>();
  private readonly transactionBatch: any[] = [];
  private readonly customerBatch: any[] = [];
  private readonly BATCH_SIZE = 1000;

  constructor (
    private readonly customerRepository: CustomerRepository,
    private readonly transactionRepository: TransactionRepository
  ) {}

  async process (filePath: string): Promise<void> {
    const fileStream = fs.createReadStream(filePath)
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })

    for await (const line of rl) {
      const transaction = this.parseTransaction(line)
      if (!transaction) {
        console.warn(`Linha inválida ignorada: ${line}`)
        continue
      }

      if (this.seenTransactions.has(transaction.id)) {
        console.warn(`Transação duplicada no arquivo ignorada: ${transaction.id}`)
        continue
      }

      this.seenTransactions.add(transaction.id)

      const existingTransaction = await this.transactionRepository.findByTransactionId(transaction.id)
      if (existingTransaction) {
        console.warn(`Transação já existente no banco ignorada: ${transaction.id}`)
        continue
      }

      let customerId = this.customerCache.get(transaction.cpfCnpj)

      if (!customerId) {
        const customer = await this.customerRepository.findByDocument(transaction.cpfCnpj)
        if (!customer) {
          this.customerBatch.push({ name: transaction.nome, cpfCnpj: transaction.cpfCnpj })
          customerId = transaction.cpfCnpj
        } else {
          this.customerCache.set(transaction.cpfCnpj, customer.id)
          customerId = customer.id
        }
      }

      this.transactionBatch.push({
        transactionId: transaction.id,
        customer: customerId,
        cpfCnpj: transaction.cpfCnpj,
        date: transaction.data,
        value: transaction.valor
      })

      if (this.customerBatch.length >= this.BATCH_SIZE) await this.saveCustomers()
      if (this.transactionBatch.length >= this.BATCH_SIZE) await this.saveTransactions()
    }

    await this.saveCustomers()
    await this.saveTransactions()

    this.customerCache.clear()
    this.seenTransactions.clear()
    this.transactionBatch.length = 0
    this.customerBatch.length = 0

    console.log('Processamento finalizado.')
  }

  private async saveCustomers (): Promise<void> {
    if (this.customerBatch.length === 0) return

    console.log(`Inserindo ${this.customerBatch.length} novos clientes...`)
    const insertedCustomers = await this.customerRepository.addMany(this.customerBatch)

    insertedCustomers.forEach(customer => {
      this.customerCache.set(customer.cpfCnpj, customer.id)
    })

    this.transactionBatch.forEach(transaction => {
      if (this.customerCache.has(transaction.customer)) {
        transaction.customer = this.customerCache.get(transaction.customer) ?? transaction.customer
      }
    })

    this.customerBatch.length = 0
  }

  private async saveTransactions (): Promise<void> {
    if (this.transactionBatch.length === 0) return

    console.log(`Inserindo ${this.transactionBatch.length} transações...`)
    await this.transactionRepository.addMany(this.transactionBatch)
    this.transactionBatch.length = 0
  }

  private parseTransaction (line: string): any {
    const regex = /id:(.*?);nome:(.*?);cpfCnpj:(.*?);data:(.*?);valor:(.*?);/
    const match = line.match(regex)
    if (!match) return null

    return {
      id: match[1],
      nome: match[2],
      cpfCnpj: match[3],
      data: match[4],
      valor: parseInt(match[5], 10)
    }
  }
}
