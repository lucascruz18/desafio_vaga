import { LoadTransactions } from '../../../domain/usecases/load-tranasactions'
import { DbLoadTransactionsUseCase } from '../../../data/usecases/transaction/db-load-transactions'
import { TransactionRepository } from '../../../infra/db/mongodb/transaction/transaction-repository'

export const makeDbLoadTransactions = (): LoadTransactions => {
  const transactionRepository = new TransactionRepository()

  return new DbLoadTransactionsUseCase(transactionRepository)
}
