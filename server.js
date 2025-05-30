// const express = require('express');
// const cors = require('cors');               // <-- import cors
// const sequelize = require('./config/db');
// const User = require('./models/User');
// const authRoutes = require('./routes/authRoutes');
// const auth = require('./middleware/authMiddleware');
// // const locationRoutes = require('./routes/locationRoutes');
// const locationRoutes = require('./routes/locationRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
// const subCategoryRoutes = require('./routes/subCategoryRoutes');
// const ticketRoutes = require('./routes/ticketRoutes');
// require('dotenv').config();

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173',          // Allow React app origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//   credentials: true                         // If you use cookies or auth headers
// }));

// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api', locationRoutes); 
// app.use('/api', categoryRoutes);
// app.use('/api', subCategoryRoutes);
// app.use('/api', ticketRoutes);

// // Test Protected Route
// app.get('/api/protected', auth, (req, res) => {
//   res.json({ message: 'You are authorized', user: req.user });
// });

// // Sync DB and Start Server
// sequelize.sync({ alter: true }).then(() => {
//   app.listen(process.env.PORT, () => {
//     console.log(`Server running on port ${process.env.PORT}`);
//   });
// }).catch(err => {
//   console.error('Unable to connect to the database:', err);
// });




const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const app = express();
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Serve uploaded files from "/uploads"

app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', locationRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subCategoryRoutes);
app.use('/api', ticketRoutes);

// Test Protected Route
const auth = require('./middleware/authMiddleware');
app.get('/api/protected', auth, (req, res) => {
  res.json({ message: 'You are authorized', user: req.user });
});

// Sync DB and start server
sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
