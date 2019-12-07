/* jshint indent: 2 */
const sequelize = require('sequelize');
const connection = require('../config/database');

const model = function(sequelize, DataTypes) {
  return sequelize.define('task', {
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
    taskDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    employeeHours: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    pmHours: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    taskDetail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    taskStatus: {
      type: DataTypes.ENUM('1','2','3'),
      allowNull: false
    },
    declinedMessage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true
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
    tableName: 'task'
  });
};
module.exports = model(connection, sequelize);