import Course from '../models/course.js'
import express from 'express'
import Log from '../models/log.js'
import authenticateToken from '../services/authenticateToken.js'
import Employee from '../models/employee.js'

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
    const employee = await Employee.findByPk(data.employeeId)
    if (employee.registeredAmount < employee.maxRegisterAmount) {
        const course = await Course.create(data)
        course ? await Log.create({ type: 'Cadastro Curso', description: `Realizado cadastro do curso ${course.category} - ${course.course} - ${course.classLoad} horas`, employeeId: data.employeeId }) : null
        course ? res.status(201).send(course) : res.status(400).send({ message: 'Course not created' })
    } else {
        res.status(401).send({ success: false })
    }
})

router.patch('/patchOne/:id', authenticateToken, async (req, res) => {
    const data = req.body
    const { id } = req.params
    const employee = await Employee.findByPk(data.employeeId)
    if (employee.registeredAmount < employee.maxRegisterAmount) {
        const course = await Course.findByPk(id)
        course.set(data)
        const updated = await course.save()
        updated ? await Log.create({ type: 'Atualizar Curso', description: `Atualizado o curso para ${course.category} - ${course.course} - ${course.classLoad} horas`, employeeId: data.employeeId }) : null
        res.send(course)
    } else {
        res.status(401).send({ success: false })
    }
})

router.delete('/deleteOne/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const data = req.body

    const employee = await Employee.findByPk(data.employeeId)
    if (employee.registeredAmount < employee.maxRegisterAmount) {
        const course = await Course.findByPk(id)
        const deleted = await course.destroy()
        deleted ? await Log.create({ type: 'Deletar Curso', description: `Deletado o curso ${course.category} - ${course.course} - ${course.classLoad} horas`, employeeId: data.employeeId }) : null
        res.send(course)
    } else {
        res.status(401).send({ success: false })
    }
})

export default router