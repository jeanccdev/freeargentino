// Imports
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import sequelize from './db.js'
import routes from './src/routes.js'
import fs from 'fs'
import https from 'https'
// import Employee from './src/models/employee.js'
// import bcrypt from 'bcryptjs'
// import Student from './src/models/student.js'
// import Course from './src/models/course.js'

// Inits
const app = express()
const port = process.env.PORT
// const httpsOptions = {
//     key: fs.readFileSync('/etc/letsencrypt/live/srv478386.hstgr.cloud/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/srv478386.hstgr.cloud/fullchain.pem')
// }
// const server = https.createServer(httpsOptions, app)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*',
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    allowedHeaders: ['Content-Type', 'authorization'],
    credentials: true,
    optionsSuccessStatus: 204
}))

// Controllers
app.use('/api', routes)
app.all('*', (req, res) => res.send('Route undefined'))

// Run
sequelize.sync()
    // .then(async () => { 
    //     const password = await bcrypt.hash('Gian.123456', 8)
    //     await Employee.create({
    //         username: 'admin_faetos',
    //         password: password,
    //         name: 'Administrador',
    //         role: 'create-read-update-delete-log-permissions',
    //         maxRegisterAmount: 9999999999,
    //         admin: true
    //     })
    // })
    .then(() => {
        app.listen(port, () => {
            console.clear()
            console.log(`Server running on http://localhost:${port}`)
        })
        // server.listen(port, () => {
        //     console.clear()
        //     console.log(`Server running on port ${port}`)
        // })
    })