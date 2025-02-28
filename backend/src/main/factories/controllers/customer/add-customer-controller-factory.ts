import { AddCustomerController } from '../../../../presentation/controllers/customer/add-customer-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeAddCustomerValidation } from './add-customer-validation-factory'
import { makeDbAddCustomer } from '../../usecases/db-add-customer-factory'

export const makeAddCustomerController = (): Controller => {
  return new AddCustomerController(makeDbAddCustomer(), makeAddCustomerValidation())
}
