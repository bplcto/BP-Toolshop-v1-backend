const mongoose = require('mongoose');

const MethodSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  description: {
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

module.exports = mongoose.model('method', MethodSchema);
