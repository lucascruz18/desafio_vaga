import {
  AddCustomer,
  AddCustomerModel,
  CustomerModel,
  AddCustomertRepository
} from './db-add-customer-protocols'

export class DbAddCustomer implements AddCustomer {
  constructor (
    private readonly addCustomerRepository: AddCustomertRepository
    // private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (customerData: AddCustomerModel): Promise<CustomerModel> {
    // const accountExist = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    // if (accountExist) {
    //   return null
    // }
    // const hashedPassword = await this.hasher.hash(accountData.password)
    const customer = await this.addCustomerRepository.add(customerData)

    return customer
  }
}
