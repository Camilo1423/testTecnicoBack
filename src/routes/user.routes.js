import { Router } from 'express'
import { userLogin, userPublicRegister, userPrivateRegister, getUser } from '../controllers/user.controller.js'
import { checkAuth } from '../middlewares/checkAuth.js'



const router = Router()

router.post('/login', userLogin)
router.post('/resgisterpublic', userPublicRegister)


router.post('/resgisterprivate', checkAuth, userPrivateRegister)
router.get('/getusers', checkAuth, getUser)

export default router