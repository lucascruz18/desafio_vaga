import { Router } from 'express'
import multer from 'multer'
import { makeProcessTransactionFileController } from '../factories/controllers/transaction/process-transaction-file-controller-factory'
import { adaptRoute } from '../adapters/express/express-route-adapter.'
import uploadConfig from '../config/upload'

export default (router: Router): void => {
  const upload = multer(uploadConfig.multer)

  router.post('/transaction/upload', upload.single('file'), adaptRoute(makeProcessTransactionFileController()))
}
