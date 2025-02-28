import { TransactionModel } from '../models/transaction'

export interface AddTransactionModel {
  transactionId: string
  customer: string
  date: string
  value: number
}

export interface AddTransaction {
  add (transactionData: AddTransactionModel): Promise<TransactionModel>
}
