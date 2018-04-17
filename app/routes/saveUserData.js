const Sequelize = require('sequelize');
const sequelize = new Sequelize('userbase', 'christianlowe', 'neokid13', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
     max: 5,
     min: 0,
     acquire: 30000,
     idle: 10000
   },
