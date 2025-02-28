import { TransactionModel } from '../../../../domain/models/transaction'
import { AddTransactionModel } from '../../../../domain/usecases/add-transaction'

export interface AddTransactionRepository {
  add (transactionData: AddTransactionModel): Promise<TransactionModel>
  addMany (transactions: AddTransactionModel[]): Promise<TransactionModel[]>
}
