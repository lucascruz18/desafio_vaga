import { ProcessTransactionFile } from '../../../domain/usecases/process-transaction-file'
import { FileUploader } from '../../protocols/upload/file-uploader'
import { TransactionProcessor } from '../../protocols/processors/transaction-processor'

export class ProcessTransactionFileUseCase implements ProcessTransactionFile {
  constructor (
    private readonly fileUploader: FileUploader,
    private readonly transactionProcessor: TransactionProcessor
  ) {}

  async processFile (file: string): Promise<void> {
    if (!file) {
      throw new Error('Nenhum arquivo foi enviado')
    }

    const filePath = await this.fileUploader.upload(file)

    await this.transactionProcessor.process(filePath)
  }
}
