import { Router } from 'express'
import { registerProduct } from '../controllers/product.controller.js'
import { checkAuth } from '../middlewares/checkAuth.js'



const router = Router()

router.post('/register', registerProduct)

export default router