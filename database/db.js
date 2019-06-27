const Sequelize = require("sequelize")
const Sequelize1 = require("sequelize")

const db = {}
const db1 = {}

const sequelize = new Sequelize("nodejs_login", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    port : "3306",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
const sequelize1 = new Sequelize("todos", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    port : "3306",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})


db.sequelize = sequelize
db.Sequelize = Sequelize
db1.sequelize = sequelize1
db1.Sequelize = Sequelize1
module.exports = db 




