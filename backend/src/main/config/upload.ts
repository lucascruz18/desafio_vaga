/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/ban-types */
import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'
import path from 'path'
import { File } from '../../domain/models/file'

const tempFolder = path.resolve(__dirname, '..', '..', '..', 'tmp')

interface IUploadConfig {
  driver: 's3' | 'disk'

  tempFolder: string
  uploadsFolder: string

  multer: {
    storage: StorageEngine
  }
  config: { disk: {}, aws: { bucket: string } }
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename (request, file: File, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
      }
    })
  },
  config: {
    disk: {},
    aws: {
      bucket: 'zeztra-files'
    }
  }
} as IUploadConfig
