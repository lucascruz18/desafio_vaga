import { TransactionModel } from '../../../../domain/models/transaction'

export interface FindTransactionByIdRepository {
  findByTransactionId (id: string): Promise<TransactionModel>
}
