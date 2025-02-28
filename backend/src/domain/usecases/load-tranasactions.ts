import { TransactionFilters } from '../dto/transaction-filter-dto'
import { TransactionResult } from '../models/transaction'

export interface LoadTransactions {
  load: (filters: TransactionFilters) => Promise<TransactionResult>
}
