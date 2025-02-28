import { CustomerModel } from '../models/customer'

export interface AddCustomerModel {
  name: string
  cpfCnpj: string
}

export interface AddCustomer {
  add (customer: AddCustomerModel): Promise<CustomerModel>
}
