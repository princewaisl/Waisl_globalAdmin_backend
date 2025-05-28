const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./categoryModel');

const SubCategory = sequelize.define('SubCategory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  main_category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, {
  tableName: 'sub_category',
  timestamps: false
});

SubCategory.belongsTo(Category, { foreignKey: 'main_category_id', as: 'category' });
Category.hasMany(SubCategory, { foreignKey: 'main_category_id', as: 'subcategories' });

module.exports = SubCategory;
