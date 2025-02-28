import { TransactionFilters } from '../../../domain/dto/transaction-filter-dto'
import { TransactionResult } from '../../../domain/models/transaction'
import { LoadTransactions } from '../../../domain/usecases/load-tranasactions'
import { LoadTransactionsRepository } from '../../protocols/db/transaction/load-transaction-repostiroy'

export class DbLoadTransactionsUseCase implements LoadTransactions {
  constructor (
    private readonly loadTransactionsRepository: LoadTransactionsRepository
  ) {}

  async load (filters: TransactionFilters): Promise<TransactionResult> {
    const transactions = await this.loadTransactionsRepository.load(filters)

    return transactions
  }
}
