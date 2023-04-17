const mongoose = require('mongoose');

const VpsSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true,
    // unique: true
  },
  information: {
    type: String,
    required: true
  },
  ram: {
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

module.exports = mongoose.model('vps', VpsSchema);
