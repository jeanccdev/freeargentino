import { DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import course from './course.js'
import document from './document.js'
import student from './student.js'

const employee = sequelize.define('employee', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4      
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'Common'
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

course.belongsTo(employee, {
    foreignKey: 'employeeId'
})
student.belongsTo(employee, {
    foreignKey: 'employeeId'
})
document.belongsTo(employee, {
    foreignKey: 'employeeId'
})
employee.hasMany(document)
employee.hasMany(student)
employee.hasMany(course)

export default employee