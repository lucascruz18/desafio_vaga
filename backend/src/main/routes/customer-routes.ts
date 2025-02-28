import { Router } from 'express'
import { makeAddCustomerController } from '../factories/controllers/customer/add-customer-controller-factory'
import { adaptRoute } from '../adapters/express/express-route-adapter.'

export default (router: Router): void => {
  router.post('/customers', adaptRoute(makeAddCustomerController()))
}
