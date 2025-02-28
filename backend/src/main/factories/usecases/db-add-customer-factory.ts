import { DbAddCustomer } from '../../../data/usecases/customer/db-add-customer'
import { CustomerRepository } from '../../../infra/db/mongodb/customer/customer-repository'
import { AddCustomer } from '../../../domain/usecases/add-customer'

export const makeDbAddCustomer = (): AddCustomer => {
  const customerRepository = new CustomerRepository()

  return new DbAddCustomer(customerRepository)
}
