const connection = require('../db/connection');
const { DataTypes } = require('sequelize')

module.exports = connection.define("posts", {
    title: {
        type: DataTypes.STRING,
    },
    message: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
    },
    dislikes: {
        type: DataTypes.INTEGER,
    },
    user_name: {
        type: DataTypes.STRING,
    },
})