const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
  req.user = decoded;
  next();
} catch (err) {
  console.error("JWT error:", err);
  return res.status(403).json({ message: 'Invalid token' });
}
};

module.exports = auth;
