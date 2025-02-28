import { TransactionModel, TransactionResult } from '../../../../domain/models/transaction'
import { AddTransactionModel } from '../../../../domain/usecases/add-transaction'
import { MongoHelper } from '../helpers/mongo-helper'
import { AddTransactionRepository } from '../../../../data/protocols/db/transaction/add-transaction-repository'
import { FindTransactionByIdRepository } from '../../../../data/protocols/db/transaction/find-transaction-by-id-repository'
import { TransactionFilters } from '../../../../domain/dto/transaction-filter-dto'
import { LoadTransactionsRepository } from '../../../../data/protocols/db/transaction/load-transaction-repostiroy'
import { ObjectId } from 'mongodb'

export class TransactionRepository implements AddTransactionRepository, FindTransactionByIdRepository, LoadTransactionsRepository {
  async add (transactionData: AddTransactionModel): Promise<TransactionModel> {
    const transactionCollection = await MongoHelper.getCollection('transactions')
    const result = await transactionCollection.insertOne(transactionData)

    return MongoHelper.map(result.ops[0])
  }

  async addMany (transactions: AddTransactionModel[]): Promise<TransactionModel[]> {
    const transactionCollection = await MongoHelper.getCollection('transactions')
    const result = await transactionCollection.insertMany(transactions)

    return result.ops.map(MongoHelper.map)
  }

  async findByTransactionId (id: string): Promise<TransactionModel | null> {
    const transactionCollection = await MongoHelper.getCollection('transactions')
    const transaction = await transactionCollection.findOne({ transactionId: id })

    return transaction && MongoHelper.map(transaction)
  }

  async findAll (): Promise<TransactionModel[]> {
    const transactionCollection = await MongoHelper.getCollection('transactions')
    const transaction = await transactionCollection.find()

    return transaction && MongoHelper.map(transaction)
  }

  async findAllTransactionIds (): Promise<string[]> {
    const transactionCollection = await MongoHelper.getCollection('transactions')
    const transaction = await transactionCollection.find({ select: { transactionId: 1 } })

    return transaction && MongoHelper.map(transaction)
  }

  async load (filters: TransactionFilters): Promise<TransactionResult> {
    const transactionCollection = await MongoHelper.getCollection('transactions')

    const query: any = {}

    if (filters.customer?.trim()) {
      query.customer = new ObjectId(filters.customer.trim())
    }
    if (filters.transactionId?.trim()) {
      query.transactionId = filters.transactionId.trim()
    }
    if (filters.startDate && filters.endDate) {
      console.log('FILTERS: ', filters)
      query.date = {
        $gte: filters.startDate,
        $lte: filters.endDate
      }
    }
    if (filters.value) {
      query.value = { $gte: filters.value }
    }

    const total = await transactionCollection.countDocuments(query)

    console.log('LOG: ', query)

    const transactionsCursor = await transactionCollection
      .find(query)
      .skip((filters.page - 1) * Number(filters.limit))
      .limit(Number(filters.limit))

    const transactions = await transactionsCursor.toArray()

    return {
      data: transactions.map(MongoHelper.map),
      total
    }
  }
}
