const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin.model');

const signupAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin instance
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new admin to the database
    await newAdmin.save();

    // Create a token for the new admin
    const token = jwt.sign({ userId: newAdmin._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(201).json({
      message: 'Admin created successfully',
      token,
      userId: newAdmin._id,
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user with the given email exists
      const user = await Admin.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }
  
      // If the password is correct, generate a JSON Web Token (JWT)
      const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', {
        expiresIn: '1h', // Token expiration time
      });
  
      // Send the token as a response
      res.status(200).json({ success: true, token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

module.exports = { signupAdmin, adminLogin };