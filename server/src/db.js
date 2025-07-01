const { Sequelize } = require('sequelize')
require('dotenv').config();

const dataInfo = process.env.DATABASE_URL

const sequelize = new Sequelize(dataInfo, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // отключает SQL-логи
});

module.exports = { sequelize };