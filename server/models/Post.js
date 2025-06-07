const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption: String,
  imageUrl: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  shares: Number
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
