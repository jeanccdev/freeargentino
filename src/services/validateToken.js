import jwt from 'jsonwebtoken'
import Employee from '../models/employee.js'

const validateToken = (token, secret, idEmployee) => {
    jwt.verify(token, secret, async (err, user) => {
        if (err) return err

        const employee = await Employee.findByPk(idEmployee)
        employee.set({ verified: true })
        await employee.save()
    })

    return true
}

export default validateToken