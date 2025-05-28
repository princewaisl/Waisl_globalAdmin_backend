const express = require('express');
const router = express.Router();
const { fetchCategories } = require('../controllers/categoryController');
const { getCategoryWithSubCategories } = require('../controllers/categoryTreeController');

router.get('/auth/categories', fetchCategories);
router.get('/auth/categories-with-sub', getCategoryWithSubCategories);


module.exports = router;
