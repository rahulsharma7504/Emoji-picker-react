const express = require('express');
const User = require('../Model/UserModel');
const jwt=require('jsonwebtoken');
const router = express.Router();

// Create or check user existence
router.post('/', async (req, res) => {
  try {
    const { data } = req.body;
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      // Generate and send JWT token
      const token = jwt.sign({user:existingUser._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
      // User exists, redirect to dashboard
      res.status(200).json({user: existingUser,token: token})
    } else {
      // User does not exist, create new user
      const newUser = new User({
        name: data.name,
        email: data.email,
        googleId: data.sub,
        photo: data.picture
      });

      await newUser.save();
      // Send JSON response
      const token = jwt.sign({user:newUser._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      return res.json({ msg: 'User added successfully', user: newUser,token:token });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
