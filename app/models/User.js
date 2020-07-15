const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { SALT_ROUNDS} = require('../config/config');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Add name.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Provide an appropriately formatted email.'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Provide a password.'],
    trim: true,
    minlength: [5, 'Password should be between 5 and 15 characters'],
    maxlength: [100, 'Password should be between 5 and 15 characters'],
    select: false
  },
  slug: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user-entered password with db value
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);