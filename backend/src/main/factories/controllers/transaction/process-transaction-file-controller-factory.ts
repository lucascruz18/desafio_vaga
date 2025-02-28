import { Controller } from '../../../../presentation/protocols/controller'
import { ProcessTransactionFileController } from '../../../../presentation/controllers/transaction/process-transaction-file-controller'
import { makeProcessTransactionFile } from '../../usecases/process-transaction-file-factory'

export const makeProcessTransactionFileController = (): Controller => {
  return new ProcessTransactionFileController(makeProcessTransactionFile())
}
