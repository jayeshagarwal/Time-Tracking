/* jshint indent: 2 */
const sequelize = require('sequelize');
const connection = require('../config/database');

const model = function(sequelize, DataTypes) {
  return sequelize.define('projectresource', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    projectId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'project',
        key: 'id'
      }
    },
    employeeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'projectresource'
  });
};

module.exports = model(connection, sequelize);