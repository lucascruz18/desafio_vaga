export interface TransactionProcessor {
  process(filePath: string): Promise<void>
}
