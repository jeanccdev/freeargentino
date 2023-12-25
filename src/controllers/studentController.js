import { v4 as uuidv4 } from 'uuid'
import Student from '../models/student.js'
import Log from '../models/log.js'
import generateToken from '../services/generateToken.js'
import express from 'express'
import authenticateToken from '../services/authenticateToken.js'

const router = express.Router()

router.get('/getAllStudentsEmployee/:employeeId', authenticateToken, async (req, res) => {
    const { employeeId } = req.params
    const students = await Student.findAll({
        where: {
            employeeId: employeeId
        }
    })
    students.length > 0 ? res.status(200).send(students) : res.status(404).send(false)
})

router.get('/getAll', authenticateToken, async (req, res) => {
    const students = await Student.findAll()
    students.length > 0 ? res.status(200).send(students) : res.status(404).send(false)
})

router.get('/getOne/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const student = await Student.findByPk(id)
    student ? res.status(200).send(student) : res.status(404).send(false)
})

router.get('/getId/:id', authenticateToken, async (req, res) => {
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
    try {
        const student = await Student.findOne({
            where: {
                cpf: cpf
            }
        })
            .then(student => {
                const token = generateToken({ id: student.id, name: student.firstName })
                res.status(200).send({ student: student, token: token })
            })
    } catch (error) {
        res.status(404).send({ msg: error })
    }
})

router.post('/insertOne', authenticateToken, async (req, res) => {
    let data = req.body
    data.id = uuidv4()
    const student = await Student.create(data)
    student ? await Log.create({ type: 'Cadastrar Aluno', description: `Realizado o cadastro do aluno ${student.firstName} ${student.lastName}`, employeeId: data.employeeId }) : null
    student ? res.status(201).send(student) : res.status(400).send(false)
})

router.patch('/patchOne/:id', authenticateToken, async (req, res) => {
    const data = req.body
    const { id } = req.params
    const student = await Student.findByPk(id)
    student.set(data)
    const updated = await student.save()
    updated ? await Log.create({ type: 'Atualizar Aluno', description: `Atualizado o aluno para ${student.firstName} ${student.lastName}`, employeeId: data.employeeId }) : null
    res.send(student)
})

router.delete('/deleteOne/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const data = req.body
    const student = await Student.findByPk(id)
    const deleted = await student.destroy()
    deleted ? await Log.create({ type: 'Deletar Aluno', description: `Deletado o aluno ${student.firstName} ${student.lastName}`, employeeId: data.employeeId }) : null
    res.send(student)
})

export default router