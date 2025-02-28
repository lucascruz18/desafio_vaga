import { TransactionModel } from '../../../../domain/models/transaction'
import { AddTransactionModel } from '../../../../domain/usecases/add-transaction'
import { MongoHelper } from '../helpers/mongo-helper'
import { AddTransactionRepository } from '../../../../data/protocols/db/transaction/add-transaction-repository'
import { FindTransactionByIdRepository } from '../../../../data/protocols/db/transaction/find-transaction-by-id-repository'

export class TransactionRepository implements AddTransactionRepository, FindTransactionByIdRepository {
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
}
