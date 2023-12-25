import express from 'express'
import authController from './controllers/authController.js'
import courseController from './controllers/courseController.js'
import documentController from './controllers/documentController.js'
import employeeController from './controllers/employeeController.js'
import studentController from './controllers/studentController.js'

const router = express.Router()

router.use('/auth', authController)
router.use('/course', courseController)
router.use('/document', documentController)
router.use('/employee', employeeController)
router.use('/student', studentController)

export default router