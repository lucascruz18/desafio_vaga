import {
  HttpRequest,
  HttpResponse,
  Controller,
  Validation,
  AddCustomer
} from './customer-protocols'
import { badRequest, serverError, ok, forbidden } from '../../helpers/http/http-helpers'
import { EmailInUseError } from '../../errors'

export class AddCustomerController implements Controller {
  constructor (
    private readonly addCustomer: AddCustomer,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const checkErrorValidation = this.validation.validate(httpRequest.body)
      if (checkErrorValidation) {
        return badRequest(checkErrorValidation)
      }
      const { name, cpfCnpj } = httpRequest.body
      const customer = await this.addCustomer.add({
        name,
        cpfCnpj
      })
      if (!customer) {
        return forbidden(new EmailInUseError())
      }

      return ok({ customer })
    } catch (error) {
      return serverError(error)
    }
  }
}
