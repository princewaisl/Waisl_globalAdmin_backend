const express = require('express');
const router = express.Router();
const { getAllLocations } = require('../controllers/locationController');

// For example:
router.get('/auth/locations', getAllLocations);

module.exports = router;
