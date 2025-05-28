const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // import your sequelize instconst { DataTypes } = require('sequelize');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'category',
  timestamps: false
});

module.exports = Category;
