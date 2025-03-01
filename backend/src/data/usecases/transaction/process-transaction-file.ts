import { ProcessTransactionFile, ProcessTransactionResult } from '../../../domain/usecases/process-transaction-file'
import { FileUploader } from '../../protocols/upload/file-uploader'
import { TransactionProcessor } from '../../protocols/processors/transaction-processor'

export class ProcessTransactionFileUseCase implements ProcessTransactionFile {
  constructor (
    private readonly fileUploader: FileUploader,
    private readonly transactionProcessor: TransactionProcessor
  ) {}

  async processFile (file: string): Promise<ProcessTransactionResult> {
    if (!file) {
      throw new Error('Nenhum arquivo foi enviado')
    }

    const startTime = performance.now()

    const filePath = await this.fileUploader.upload(file)
    await this.transactionProcessor.process(filePath)

    const endTime = performance.now()
    const processingTime = (endTime - startTime) / 1000

    return {
      duration: processingTime.toFixed(2)
    }
  }
}
