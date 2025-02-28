export interface FileUploader {
  upload(file: string, type?: string): Promise<string>
}
