import { TransactionFilters } from '../../../../domain/dto/transaction-filter-dto'
import { TransactionResult } from '../../../../domain/models/transaction'

export interface LoadTransactionsRepository {
  load (filters: TransactionFilters): Promise<TransactionResult>
}
