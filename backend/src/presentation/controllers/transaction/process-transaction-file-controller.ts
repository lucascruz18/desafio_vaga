import {
  HttpRequest,
  HttpResponse,
  Controller,
  ProcessTransactionFile
} from './transaction-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helpers'

export class ProcessTransactionFileController implements Controller {
  constructor (
    private readonly processTransactionFile: ProcessTransactionFile
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.file) {
        return badRequest(new Error('Arquivo não enviado'))
      }

      const processResult = await this.processTransactionFile.processFile(httpRequest.file)

      return ok({ status: 'finished', duration: processResult.duration })
    } catch (error) {
      return serverError(error)
    }
  }
}
