import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import dotenv from 'dotenv'
import env from './config/env'

dotenv.config()

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
