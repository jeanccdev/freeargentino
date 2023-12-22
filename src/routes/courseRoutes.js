import express from 'express'
import authenticateToken from '../services/authenticateToken.js'
import { courseDeleteOne, courseGetAll, courseGetOne, courseInsertOne, coursePatchOne, courseGetCourses } from '../controllers/courseController.js'

const router = express.Router()

router.get('/getAll', authenticateToken, courseGetAll)
router.get('/getCourses/:id', authenticateToken, courseGetCourses)
router.get('/getOne/:id', authenticateToken, courseGetOne)
router.post('/insertOne', authenticateToken, courseInsertOne)
router.patch('/patchOne/:id', authenticateToken, coursePatchOne)
router.delete('/deleteOne/:id', authenticateToken, courseDeleteOne)

export default router