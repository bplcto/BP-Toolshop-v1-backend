const mongoose = require('mongoose');

const ShellSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  tld: {
    type: String,
    required: true,
  },
  ssl: {
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

module.exports = mongoose.model('shell', ShellSchema);
