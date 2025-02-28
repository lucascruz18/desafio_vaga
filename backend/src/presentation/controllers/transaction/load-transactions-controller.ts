import {
  HttpRequest,
  HttpResponse,
  Controller,
  LoadTransactions
} from './transaction-protocols'
import { serverError, ok } from '../../helpers/http/http-helpers'

export class LoadTransactionsController implements Controller {
  constructor (
    private readonly loadTransactions: LoadTransactions
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const transactions = await this.loadTransactions.load(httpRequest.query)

      return ok(transactions)
    } catch (error) {
      return serverError(error)
    }
  }
}
