import { v4 as uuidv4 } from 'uuid'
import Student from '../models/student.js'
import generateToken from '../services/generateToken.js'

const studentGetAll = async (req, res) => {
    const students = await Student.findAll()
    students.length > 0 ? res.status(200).send(students) : res.status(404).send(false)
}

const studentGetOne = async (req, res) => {
    const { id } = req.params
    const student = await Student.findByPk(id)
    student ? res.status(200).send(student) : res.status(404).send(false)
}

const studentGetId = async (req, res) => {
    const { id } = req.params
    const student = await Student.findOne({
        where: {
            id: id
        }
    })
    student ? res.status(200).send(student) : res.status(404).send(false)
}

const studentGetCpf = async (req, res) => {
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
}

const studentInsertOne = async (req, res) => {
    let data = req.body
    data.id = uuidv4()
    const student = await Student.create(data)
    student ? res.status(201).send(student) : res.status(400).send(false)
}

const studentPatchOne = async (req, res) => {
    const data = req.body
    const { id } = req.params
    const student = await Student.findByPk(id)
    student.set(data)
    await student.save()
    res.send(student)
}

const studentDeleteOne = async (req, res) => {
    const { id } = req.params
    const student = await Student.findByPk(id)
    await student.destroy()
    res.send(student)
}

export { studentDeleteOne, studentGetAll, studentGetCpf, studentGetId, studentGetOne, studentInsertOne, studentPatchOne }