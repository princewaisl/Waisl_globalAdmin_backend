const User = require('../models/User');
exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'emp_id', 'email_id', 'role', 'status', 'location']
  });
  res.json(users);
};
