import { Router } from 'express'
import { 
    registerProduct, 
    getProducto, 
    getSingleProducto, 
    registerEntrada, 
    getEntradaSalida, 
    registerSalida, 
    deleteSalida, 
    deleteEntrada,
    deleteProducto
} from '../controllers/product.controller.js'
import { checkAuth } from '../middlewares/checkAuth.js'



const router = Router()

router.post('/register', checkAuth, registerProduct)
router.post('/registerentrada/:id', checkAuth, registerEntrada)
router.post('/registersalida/:id', checkAuth, registerSalida)

router.get('/getproduct', checkAuth, getProducto)
router.get('/getentradas/:id', checkAuth, getEntradaSalida)
router.get('/getsingleproduct/:id', checkAuth, getSingleProducto)

router.delete('/deletesalida/:id', checkAuth, deleteSalida)
router.delete('/deleteentrada/:id', checkAuth, deleteEntrada)
router.delete('/producto/:id', checkAuth, deleteProducto)

export default router