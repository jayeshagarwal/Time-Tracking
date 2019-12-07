'use strict';

var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var constants    = require('./constant');
var db        = {};

const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize(constants.database, constants.username, constants.password, {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});


module.exports = sequelize;