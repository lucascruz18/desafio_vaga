export interface ProcessTransactionResult {
  duration: string
}

export interface ProcessTransactionFile {
  processFile (file: string): Promise<ProcessTransactionResult>
}
