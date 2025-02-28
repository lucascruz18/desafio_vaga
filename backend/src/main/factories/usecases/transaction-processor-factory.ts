import { TransactionProcessor } from '../../../data/protocols/processors/transaction-processor'
import { TransactionProcessorRepository } from '../../../infra/processors/transaction-processor-reposiroy'
import { CustomerRepository } from '../../../infra/db/mongodb/customer/customer-repository'
import { TransactionRepository } from '../../../infra/db/mongodb/transaction/transaction-repository'

export const makeTransactionProcessorFile = (): TransactionProcessor => {
  const customerRepository = new CustomerRepository()
  const transactionRepository = new TransactionRepository()

  return new TransactionProcessorRepository(customerRepository, transactionRepository)
}
