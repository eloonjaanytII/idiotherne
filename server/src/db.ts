const { Sequelize } = require('sequelize');
require('dotenv').config();

const dataInfo = process.env.DATABASE_URL;

if (!dataInfo) throw new Error('DATABASE_URL is not set in .env');


const sequelize = new Sequelize(dataInfo, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // отключает SQL-логи
});

module.exports = { sequelize };