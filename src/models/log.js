import { DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import employee from './employee.js'

const log = sequelize.define('log', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4      
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

log.belongsTo(employee, {
    foreignKey: 'employeeId'
})
employee.hasMany(log)

export default log