import { CustomerModel } from '../../../../domain/models/customer'

export interface FindCustomerByDocumentRepository {
  findByDocument (document: string): Promise<CustomerModel>
}
