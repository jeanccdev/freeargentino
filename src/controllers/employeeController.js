import Employee from '../models/employee.js'
import Log from '../models/log.js'
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
    const updated = await employee.save()
    updated ? await Log.create({ type: 'Atualizar Parceiro', description: `Atualizado o parceiro ${employee.username} - ${employee.name}`, employeeId: data.employeeId }) : null
    res.send(employee)
})

router.patch('/patchRegisterAmount/:id', authenticateToken, async (req, res) => {
    const data = req.body
    const { id } = req.params
    if (data.type == 'add') {
        const emp = await Employee.increment('maxRegisterAmount', {
            by: data.amount,
            where: {
                id: id
            }
        })
        emp ? res.status(200).send({ success: true, employee: emp }) : res.send(400).send({ success: false })
    } else if (data.type == 'delete') {
        const emp = await Employee.decrement('maxRegisterAmount', {
            by: data.amount,
            where: {
                id: id
            }
        })
        emp ? res.status(200).send({ success: true, employee: emp }) : res.send(400).send({ success: false })
    }
})

router.delete('/deleteOne/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const data = req.body
    const employee = await Employee.findByPk(id)
    const deleted = await employee.destroy()
    deleted ? await Log.create({ type: 'Deletar Parceiro', description: `Deletado o parceiro ${employee.username} - ${employee.name}`, employeeId: data.employeeId }) : null
    res.send(employee)
})

export default router