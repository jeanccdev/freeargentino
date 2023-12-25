import Course from '../models/course.js'
import express from 'express'
import authenticateToken from '../services/authenticateToken.js'

const router = express.Router()

router.get('/getAllCoursesEmployee/:employeeId', authenticateToken, async (req, res) => {
    const { employeeId } = req.params
    const courses = await Course.findAll({
        where: {
            employeeId: employeeId
        }
    })
    courses.length > 0 ? res.status(200).send(courses) : res.status(404).send(false)
})

router.get('/getAll', authenticateToken, async (req, res) => {
    const courses = await Course.findAll()
    courses.length > 0 ? res.status(200).send(courses) : res.status(404).send({ message: 'No course found' })
})

router.get('/getCourses/:id', async (req, res) => {
    const { id } = req.params
    const courses = await Course.findAll({
        where: {
            studentId: id
        }
    })
    courses.length > 0 ? res.status(200).send(courses) : res.status(404).send(false)
})

router.get('/getOne/:id', async (req, res) => {
    const { id } = req.params
    const course = await Course.findByPk(id)
    course ? res.status(200).send(course) : res.status(404).send({ message: 'Course not found' })
})

router.post('/insertOne', authenticateToken, async (req, res) => {
    const data = req.body
    const course = await Course.create(data)
    course ? res.status(201).send(course) : res.status(400).send({ message: 'Course not created' })
})

router.patch('/patchOne/:id', authenticateToken, async (req, res) => {
    const data = req.body
    const { id } = req.params
    const course = await Course.findByPk(id)
    course.set(data)
    await course.save()
    res.send(course)
})

router.delete('/deleteOne/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const course = await Course.findByPk(id)
    await course.destroy()
    res.send(course)
})

export default router