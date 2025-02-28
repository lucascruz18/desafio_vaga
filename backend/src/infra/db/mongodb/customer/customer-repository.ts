import { AddCustomertRepository } from '../../../../data/protocols/db/customer/add-customer-repository'
import { AddCustomerModel } from '../../../../domain/usecases/add-customer'
import { CustomerModel } from '../../../../domain/models/customer'
import { MongoHelper } from '../helpers/mongo-helper'
import { FindCustomerByDocumentRepository } from '../../../../data/protocols/db/customer/find-customer-by-document-repository'

export class CustomerRepository implements AddCustomertRepository, FindCustomerByDocumentRepository {
  async add (customerData: AddCustomerModel): Promise<CustomerModel> {
    const customerCollection = await MongoHelper.getCollection('customers')
    const result = await customerCollection.insertOne(customerData)

    return MongoHelper.map(result.ops[0])
  }

  async addMany (customers: AddCustomerModel[]): Promise<CustomerModel[]> {
    const customerCollection = await MongoHelper.getCollection('customers')
    const result = await customerCollection.insertMany(customers)

    return result.ops.map(MongoHelper.map)
  }

  async findByDocument (cpfCnpj: string): Promise<CustomerModel | null> {
    const customerCollection = await MongoHelper.getCollection('customers')
    const customer = await customerCollection.findOne({ cpfCnpj })

    return customer && MongoHelper.map(customer)
  }

  async findAll (): Promise<CustomerModel[]> {
    const customerCollection = await MongoHelper.getCollection('customers')
    const customer = await customerCollection.find()

    return customer && MongoHelper.map(customer)
  }
}
