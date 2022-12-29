import { Router } from 'express'
import { registerProduct, getProducto } from '../controllers/product.controller.js'
import { checkAuth } from '../middlewares/checkAuth.js'



const router = Router()

router.post('/register', checkAuth, registerProduct)
router.get('/getproduct', checkAuth, getProducto)

export default router