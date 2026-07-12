const { DataTypes } = require('sequelize')
const db = require('../db')

const Song = db.define('Song', {
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    artist:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    duration:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = Song