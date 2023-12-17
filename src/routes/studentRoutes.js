import express from 'express'
import authenticateToken from '../services/authenticateToken.js'
import { studentDeleteOne, studentGetAll, studentGetCpf, studentGetId, studentGetOne, studentInsertOne, studentPatchOne } from '../controllers/studentController.js'

const router = express.Router()

router.get('/getAll', studentGetAll)
router.get('/getOne/:id', studentGetOne)
router.get('/getId/:id', studentGetId)
router.get('/getCpf/:cpf', studentGetCpf)
router.post('/insertOne', studentInsertOne)
router.patch('/patchOne/:id', studentPatchOne)
router.delete('/deleteOne/:id', studentDeleteOne)

export default router