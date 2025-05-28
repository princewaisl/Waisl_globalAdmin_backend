const SubCategory = require('../models/SubCategory');

const fetchSubCategories = async (req, res) => {
  const { categoryId } = req.query;

  if (!categoryId) {
    return res.status(400).json({ message: 'categoryId is required' });
  }

  try {
    const subCategories = await SubCategory.findAll({
      where: { main_category_id: categoryId },
      attributes: ['id', 'name']
    });
    res.json(subCategories);
  } catch (error) {
    console.error('SubCategory fetch error:', error);
    res.status(500).json({ message: 'Error fetching subcategories' });
  }
};

module.exports = { fetchSubCategories };
