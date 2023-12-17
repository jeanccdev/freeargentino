import express from 'express'
import authenticateToken from '../services/authenticateToken.js'
import { courseDeleteOne, courseGetAll, courseGetOne, courseInsertOne, coursePatchOne } from '../controllers/courseController.js'

const router = express.Router()

router.get('/getAll', courseGetAll)
router.get('/getOne/:id', courseGetOne)
router.post('/insertOne', courseInsertOne)
router.patch('/patchOne/:id', coursePatchOne)
router.delete('/deleteOne/:id', courseDeleteOne)

export default router