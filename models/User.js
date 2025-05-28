const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const commonFields = require('./commonFields');
const User = sequelize.define('User', {
  ...commonFields,

    emp_name: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true, // Keep this
  },
  emp_id: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true, // Keep this
  },
  email_id: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true, // Keep this
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
