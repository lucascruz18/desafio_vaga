import { Controller } from '../../../../presentation/protocols/controller'
import { LoadTransactionsController } from '../../../../presentation/controllers/transaction/load-transactions-controller'
import { makeDbLoadTransactions } from '../../usecases/db-load-transactions-factory'

export const makeLoadTransactionsController = (): Controller => {
  return new LoadTransactionsController(makeDbLoadTransactions())
}
