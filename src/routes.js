import express from 'express'
import authController from './controllers/authController.js'
import courseController from './controllers/courseController.js'
import documentController from './controllers/documentController.js'
import employeeController from './controllers/employeeController.js'
import studentController from './controllers/studentController.js'
import generateToken from './services/generateToken.js'
import authenticateToken from './services/authenticateToken.js'

const router = express.Router()

router.use('/auth', authController)
router.use('/course', courseController)
router.use('/document', documentController)
router.use('/employee', employeeController)
router.use('/student', studentController)
router.get('/test', (req, res) => {
    const token = generateToken({ id: '123', username: 'admin' }, process.env.SECRET, 60 * 60)
    const test = authenticateToken(token)
    res.send(test)
})

export default router