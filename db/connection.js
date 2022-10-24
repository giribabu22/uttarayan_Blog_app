const Sequelize = require("sequelize");

module.exports = new Sequelize('uttarayan', "uttarayan", 'uttarayan', {
        host: "db4free.net",
        port: 3306,
        dialect: 'mysql',
        logging: false
})
