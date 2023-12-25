// Imports
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import sequelize from './db.js'
import routes from './src/routes.js'
import Employee from './src/models/employee.js'
import bcrypt from 'bcryptjs'
import Student from './src/models/student.js'
import Course from './src/models/course.js'

// Inits
const app = express()
const port = process.env.PORT

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}))

// Controllers
app.use('/api', routes)
app.all('*', (req, res) => res.send('Route undefined'))

// Run
sequelize.sync({
    // force: true
})
    // .then(async () => {
    //     const password = await bcrypt.hash('Gian.123456', 8)
    //     const admin = await Employee.create({
    //         username: 'g.perazzo',
    //         password: password,
    //         name: 'Administrador',
    //         role: 'create-read-update-delete-log-permissions'
    //     })
    // })
    .then(() => {
        app.listen(port, () => {
            console.clear()
            console.log(`Server running on http://localhost:${port}`)
        })
    })