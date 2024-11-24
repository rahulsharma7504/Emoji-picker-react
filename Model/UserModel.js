const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  googleId: String,
  photo:String,
});

module.exports = mongoose.model('User', userSchema);