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

      const file = await this.processTransactionFile.processFile(httpRequest.file)

      return ok({ file })
    } catch (error) {
      return serverError(error)
    }
  }
}
