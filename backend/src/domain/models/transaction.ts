export interface TransactionModel {
  transactionId: string
  customer: string
  date: string
  value: number
}

export interface TransactionResult {
  data: TransactionModel[]
  total: number
}
