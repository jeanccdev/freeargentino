import express from 'express'
import authenticateToken from '../services/authenticateToken.js'
import { employeeDeleteOne, employeeGetAll, employeeGetOne, employeePatchOne } from '../controllers/employeeController.js'

const router = express.Router()

router.get('/getAll', employeeGetAll)
router.get('/getOne/:id', employeeGetOne)
router.patch('/patchOne/:id', employeePatchOne)
router.delete('/deleteOne/:id', employeeDeleteOne)

export default router