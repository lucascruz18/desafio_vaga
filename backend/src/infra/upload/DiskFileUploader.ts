import fs from 'fs'
import path from 'path'
import uploadConfig from '../../main/config/upload'
import { FileUploader } from '../../data/protocols/upload/file-uploader'

export class DiskFileUploader implements FileUploader {
  async upload (file: Express.Multer.File): Promise<string> {
    try {
      console.log('Recebido no upload:', file)

      const filename = file.filename

      const filePath = path.resolve(uploadConfig.tempFolder, filename)

      if (!fs.existsSync(uploadConfig.uploadsFolder)) {
        fs.mkdirSync(uploadConfig.uploadsFolder, { recursive: true })
      }

      const finalPath = path.resolve(uploadConfig.uploadsFolder, filename)
      await fs.promises.rename(filePath, finalPath)

      return finalPath
    } catch (error) {
      console.log('ERROR PRA FAZER UPLOAD: ', error)
      throw new Error('Erro ao fazer upload do arquivo')
    }
  }
}
