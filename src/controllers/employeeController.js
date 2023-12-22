import Employee from '../models/employee.js'
import express from 'express'
import authenticateToken from '../services/authenticateToken.js'

const router = express.Router()

router.get('/getAll', authenticateToken, async (req, res) => {
    const employees = await Employee.findAll()
    employees.length > 0 ? res.status(200).send(employees) : res.status(404).send({ message: 'No employee found' })
})

router.get('/getOne/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const employee = await Employee.findByPk(id)
    employee ? res.status(200).send(employee) : res.status(404).send({ message: 'Employee not found' })
})

router.patch('/patchOne/:id', authenticateToken, async (req, res) => {
    const data = req.body
    const { id } = req.params
    const employee = await Employee.findByPk(id)
    employee.set(data)
    await employee.save()
    res.send(employee)
})

router.delete('/deleteOne/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const employee = await Employee.findByPk(id)
    await employee.destroy()
    res.send(employee)
})

export default router