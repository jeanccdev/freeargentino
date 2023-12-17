import express from 'express'
import { authAuthenticate, authLogin, authRegister } from '../controllers/authController.js'

const router = express.Router()

router.post('/login', authLogin)
router.post('/register', authRegister)
router.get('/authenticate/:token/:idEmployee', authAuthenticate)

export default router