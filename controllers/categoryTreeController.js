const Category = require('../models/categoryModel');
const SubCategory = require('../models/SubCategory');

const getCategoryWithSubCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name'],
      include: [{
        model: SubCategory,
        as: 'subcategories',
        attributes: ['id', 'name']
      }]
    });

    res.status(200).json(categories);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Failed to fetch category tree' });
  }
};

module.exports = { getCategoryWithSubCategories };
