const Category = require('../models/categoryModel');

const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ attributes: ['id', 'name'] });
    res.json(categories);
  } catch (error) {
    console.error('Category fetch error:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

module.exports = { fetchCategories };
