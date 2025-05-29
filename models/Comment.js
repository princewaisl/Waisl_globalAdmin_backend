const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import your sequelize instance

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ticket_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment_text: {
    type: DataTypes.STRING(255),
  },
  created_by: {
    type: DataTypes.STRING(255),
  },
  created_at: {
    type: DataTypes.DATE,
  },
  additional_data: {
    type: DataTypes.JSON,
  }
}, {
  tableName: 'comments',
  timestamps: false, // Disable Sequelize’s default timestamps
});

module.exports = Comment;
