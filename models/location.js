const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // import your sequelize instance

const Location = sequelize.define('Location', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'location', // your actual table name
  timestamps: false // disable createdAt/updatedAt
});

module.exports = Location;
