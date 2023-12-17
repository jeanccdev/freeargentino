import { Sequelize } from 'sequelize'
import mysql from 'mysql2'

const sequelize = new Sequelize('argentino', 'argentino', 'argentino', {
    host: 'db4free.net',
    dialect: 'mysql',
    dialectModule: mysql,
    benchmark: true
})

export default sequelize