// Imports
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import sequelize from './db.js'
import routes from './src/routes.js'
import Employee from './src/models/employee.js'
import bcrypt from 'bcryptjs'
import Student from './src/models/student.js'

// Inits
const app = express()
const port = process.env.PORT

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))

// Controllers
app.use('/api', routes)
app.all('*', (req, res) => res.send('Route undefined'))

// Run
sequelize.sync({
    // force: true
})
    .then(async () => {
        // const password = await bcrypt.hash('admin', 8)
        // const employee = await Employee.create({
        //     username: 'admin',
        //     password: password,
        //     name: 'Administrador',
        //     role: 'Admin',
        //     verified: true
        // })

        // await Student.create({
        //     firstName: 'Jean Carlos',
        //     lastName: 'Cristóvão',
        //     rg: '5348870',
        //     cpf: '10522365965',
        //     countryBirth: 'Brasil',
        //     state: 'SC',
        //     birthdate: '1998-11-05',
        //     employeeId: employee.id
        // })

        // await Student.create({
        //     firstName: 'Larissa Rocha',
        //     lastName: 'Lopes',
        //     rg: '1234567',
        //     cpf: '03966246260',
        //     countryBirth: 'Brasil',
        //     state: 'PA',
        //     birthdate: '1999-01-16',
        //     employeeId: employee.id
        // })
        app.listen(port, () => {
            console.clear()
            console.log(`Server running on http://localhost:${port}`)
        })
    })