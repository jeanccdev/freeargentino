import { DataTypes } from 'sequelize'
import sequelize from '../../db.js'

const document = sequelize.define('document', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4      
    },
    originalName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    docType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    document: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    }
})

export default document