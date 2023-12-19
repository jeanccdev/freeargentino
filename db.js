import { Sequelize } from 'sequelize'
import mysql from 'mysql2'

const dbname = process.env.DB_DBNAME
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const hostname = process.env.DB_HOST

const sequelize = new Sequelize(dbname, username, password, {
    host: hostname,
    dialect: 'mysql',
    dialectModule: mysql,
    benchmark: true
})

export default sequelize