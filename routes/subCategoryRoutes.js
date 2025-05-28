const express = require('express');
const router = express.Router();
const { fetchSubCategories } = require('../controllers/subCategoryController');

router.get('/auth/sub-categories', fetchSubCategories);

module.exports = router;
