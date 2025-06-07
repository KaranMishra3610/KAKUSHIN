const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isOrganizer: { type: Boolean, default: false },
  drives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drive' }],
  impactScore: { type: Number, default: 0 },
  badges: [String],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', userSchema);
