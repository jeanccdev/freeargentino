import { DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import student from './student.js'

const course = sequelize.define('course', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4      
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    course: {
        type: DataTypes.STRING,
        allowNull: false
    },
    classLoad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

course.belongsTo(student, {
    foreignKey: 'studentId'
})
student.hasMany(course)

export default course