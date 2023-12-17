// Imports
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import sequelize from './db.js'
import routes from './src/routes.js'
import Employee from './src/models/employee.js'
import bcrypt from 'bcryptjs'

// Inits
const app = express()
const port = process.env.PORT

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Controllers
app.use('/api', routes)
app.all('*', (req, res) => res.send('Route undefined'))

// Run
sequelize.sync({ force: true })
.then(async () => {
    const password = await bcrypt.hash('admin', 8)
    const employee = {
        username: 'admin',
        password: password,
        name: 'Administrador',
        role: 'Admin',
        verified: true
    }
    await Employee.create(employee)
    app.listen(port, () => {
        console.clear()
        console.log(`Server running on http://localhost:${port}`)
    })
})