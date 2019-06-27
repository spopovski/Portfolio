const Sequelize = require("sequelize")
const db1 = require("../database/db")

module.exports = db1.sequelize.define(
    'todo',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      task_name: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
      }
    },
    {
      timestamps: false
    }
  )