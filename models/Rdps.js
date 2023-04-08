const mongoose = require('mongoose');

const RdpsSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true,
    // unique: true
  },
  windows: {
    type: String,
    required: true
  },
  ram: {
    type: String,
    required: true
  },
  access: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  detect_hosting: {
    type: String,
    required: true
  },
  seller: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('rdps', RdpsSchema);
