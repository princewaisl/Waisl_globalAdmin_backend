const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const commonFields = require('./commonFields');

const Ticket = sequelize.define('Ticket', {
  ...commonFields,
  
   emp_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sub_category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ticketDetails: {
    type: DataTypes.JSON,
    allowNull: true
  },
  additional_data: {
    type: DataTypes.JSON,
    allowNull: true
  },
  attachment: {
    type: DataTypes.JSON,
    allowNull: true
  },
  categoryType: {
    type: DataTypes.STRING,
    allowNull: true
  },
status: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: "pending"
},
admin_remarks: {
  type: DataTypes.TEXT,
  allowNull: true
}
}, {
  tableName: 'tickets',
  timestamps: false
});

module.exports = Ticket;
