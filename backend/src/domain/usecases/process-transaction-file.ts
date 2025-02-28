export interface ProcessTransactionFile {
  processFile (file: string): Promise<void>
}
