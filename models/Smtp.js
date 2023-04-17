const mongoose = require('mongoose');

const SmtpSchema = new mongoose.Schema({
  smtpid: {
    type: String,
    required: true,
    // unique: true
  },
  country: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true,
  },
  webmail: {
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

module.exports = mongoose.model('smtp', SmtpSchema);
