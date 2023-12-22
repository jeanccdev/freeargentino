import bcrypt from 'bcryptjs'
import Employee from '../models/employee.js'
import generateToken from '../services/generateToken.js'
import validateToken from '../services/validateToken.js'
import checkToken from '../services/checkToken.js'
import express from 'express'

const router = express.Router()

router.post('/login', async (req, res) => {
    let { username, password } = req.body
    const employee = await Employee.findOne({
        where: {
            username: username
        }
    })
    if (employee.verified) {
        const passwordMatched = await bcrypt.compare(password, employee.password)
        if (passwordMatched) {
            const token = generateToken(employee, process.env.SECRET, 60 * 60)
            res.send({ token: token, employee: employee })
        } else {
            res.send(false)
        }
    } else if (employee) {
        res.send({ verified: false })
    } else {
        res.send(false)
    }

})
router.post('/register', async (req, res) => {
    let { username, password, name } = req.body
    const employees = await Employee.findAll({
        where: {
            username: username
        }
    })
    if (employees.length < 1) {
        password = await bcrypt.hash(password, 8)
        const employee = await Employee.create({ username, password, name })
        const token = generateToken({ id: employee.id, username: employee.username }, process.env.SECRET, 60 * 60 * 24)
        // sendToken(token, employee.id)
        res.send({ token: token, employee: employee })
    } else {
        res.send({ error: true })
    }
})
router.get('/authenticate/:token/:idEmployee', (req, res) => {
    const { token, idEmployee } = req.params
    const validatedToken = validateToken(token, process.env.SECRET, idEmployee)
    res.send(validatedToken)
})

const authCheckToken = (req, res) => {
    const { token } = req.body
    const checkedToken = checkToken(token, process.env.SECRET)
    res.send(checkedToken)
}

export default router