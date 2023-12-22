import express from 'express'
import authenticateToken from '../services/authenticateToken.js'
import { employeeDeleteOne, employeeGetAll, employeeGetOne, employeePatchOne } from '../controllers/employeeController.js'

const router = express.Router()

router.get('/getAll', authenticateToken, employeeGetAll)
router.get('/getOne/:id', authenticateToken, employeeGetOne)
router.patch('/patchOne/:id', authenticateToken, employeePatchOne)
router.delete('/deleteOne/:id', authenticateToken, employeeDeleteOne)

export default router