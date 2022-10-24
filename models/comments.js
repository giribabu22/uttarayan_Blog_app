const connection = require('../db/connection');
const {DataTypes} = require('sequelize');

module.exports = connection.define('comments',{
    commit:{
        type:DataTypes.STRING,
        allowNull:false
    }
})