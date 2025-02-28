import { AddCustomerModel } from '../../../../domain/usecases/add-customer'
import { CustomerModel } from '../../../../domain/models/customer'

export interface AddCustomertRepository {
  add (customerData: AddCustomerModel): Promise<CustomerModel>
  addMany (customers: AddCustomerModel[]): Promise<CustomerModel[]>
}
