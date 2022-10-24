const connection = require('../db/connection');
const {DataTypes} = require('sequelize');

module.exports = connection.define('feedbacks',{
    feeling:{
        type:DataTypes.STRING
    }
})