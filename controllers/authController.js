const bcrypt = require("bcryptjs");
const { Op } = require('sequelize');
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
exports.register = async (req, res) => {
  const { emp_id, email_id, password, role, location,emp_name } = req.body;

  try {
    // Check if email or emp_id exists
    const existingUser = await User.findOne({ 
      where: { 
        [Op.or]: [
          { email_id },
          { emp_id }
        ] 
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Employee ID or Email already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ 
      emp_name,
      emp_id, 
      email_id, 
      password: hashedPassword, 
      role: role || 1,  // default role if not passed
      location: location || null,
      status: true
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        emp_id: user.emp_id,
        email_id: user.email_id,
        emp_name:user.emp_name
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email_id, password } = req.body;

  try {
    const user = await User.findOne({ where: { email_id } });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
      });
    }

 

     const token = jwt.sign(
      {
        id: user.id,
        emp_id: user.emp_id,
        email_id: user.email_id,
        role: user.role,
        location: user.location,
         emp_name: user.emp_name
      },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      status: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          email_id: user.email_id,
          role: user.role,
          emp_id:user.emp_id,
          location:user.location,
              emp_name: user.emp_name
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
