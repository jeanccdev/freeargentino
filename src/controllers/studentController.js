import { v4 as uuidv4 } from 'uuid'
import Student from '../models/student.js'
import generateToken from '../services/generateToken.js'
import express from 'express'
import authenticateToken from '../services/authenticateToken.js'

const router = express.Router()

router.get('/getAll', authenticateToken, async (req, res) => {
    const students = await Student.findAll()
    students.length > 0 ? res.status(200).send(students) : res.status(404).send(false)
})

router.get('/getOne/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const student = await Student.findByPk(id)
    student ? res.status(200).send(student) : res.status(404).send(false)
})

router.get('/getId/:id', async (req, res) => {
    const { id } = req.params
    const student = await Student.findOne({
        where: {
            id: id
        }
    })
    student ? res.status(200).send(student) : res.status(404).send(false)
})

router.get('/getCpf/:cpf', async (req, res) => {
    const { cpf } = req.params
    const student = await Student.findOne({
        where: {
            cpf: cpf
        }
    })
    if (student) {
        const token = generateToken({ id: student.id, name: student.firstName }, process.env.SECRET, 60 * 60)
        res.status(200).send({ student: student, token: token })
    } else {
        res.status(404).send(false)
    }
})

router.post('/insertOne', authenticateToken, async (req, res) => {
    let data = req.body
    data.id = uuidv4()
    const student = await Student.create(data)
    student ? res.status(201).send(student) : res.status(400).send(false)
})

router.patch('/patchOne/:id', authenticateToken, async (req, res) => {
    const data = req.body
    const { id } = req.params
    const student = await Student.findByPk(id)
    student.set(data)
    await student.save()
    res.send(student)
})

router.delete('/deleteOne/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const student = await Student.findByPk(id)
    await student.destroy()
    res.send(student)
})

export default router