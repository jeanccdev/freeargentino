import express from 'express'
import authRoutes from './routes/authRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import documentRoutes from './routes/documentRoutes.js'
import employeeRoutes from './routes/employeeRoutes.js'
import studentRoutes from './routes/studentRoutes.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/course', courseRoutes)
router.use('/document', documentRoutes)
router.use('/employee', employeeRoutes)
router.use('/student', studentRoutes)

export default router