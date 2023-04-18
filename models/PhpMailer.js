const mongoose = require('mongoose');

const PhpMailerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    // unique: true
  },
  country: {
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

module.exports = mongoose.model('phpmailer', PhpMailerSchema);
