const connection = require('../db/connection');
const {DataTypes} = require('sequelize');

module.exports = connection.define('commits',{
    commit:{
        type:DataTypes.STRING,
        allowNull:false
    },
    commiter_name:{
        type: DataTypes.STRING,
        allowNull: false
    }
})