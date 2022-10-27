const Sequelize = require("sequelize");

// module.exports = new Sequelize('uttarayan_app', "uttarayan_app", 'uttarayan_app', {
//         host: "db4free.net",
//         port: 3306,
//         dialect: 'mysql',
//         logging: false
// })


module.exports = new Sequelize('uttarayan', "root", 'prem@630', {
        host: "localhost",
        dialect: 'mysql',
        logging: false
})