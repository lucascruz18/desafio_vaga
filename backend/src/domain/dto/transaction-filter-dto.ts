import { PageOptionsDto } from './page-options-dto'

export interface TransactionFilters extends PageOptionsDto {
  transactionId: string
  customer: string
  cpfCnpj: string
  startDate: string
  endDate: string
  value: number
}
