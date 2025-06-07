const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  tools: [String],
  participants: { type: Number, default: 0 },
  time: String,
  organizer: String
}, { timestamps: true });

module.exports = mongoose.model('Drive', driveSchema);
