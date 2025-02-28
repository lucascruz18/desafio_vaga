import { ProcessTransactionFileUseCase } from '../../../data/usecases/transaction/process-transaction-file'
import { ProcessTransactionFile } from '../../../domain/usecases/process-transaction-file'
import { DiskFileUploader } from '../../../infra/upload/DiskFileUploader'
import { makeTransactionProcessorFile } from './transaction-processor-factory'

export const makeProcessTransactionFile = (): ProcessTransactionFile => {
  const fileUploader = new DiskFileUploader()
  const transactionProcessor = makeTransactionProcessorFile()

  return new ProcessTransactionFileUseCase(fileUploader, transactionProcessor)
}
