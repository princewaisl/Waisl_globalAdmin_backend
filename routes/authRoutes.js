const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const { register, login } = require('../controllers/authController');
const { getAllUsers } = require('../controllers/userController');



// Register & Login Routes
router.post('/register', register);
router.post('/login', login);
router.get('/users', auth, getAllUsers);


// ✅ Location Routes


module.exports = router;
