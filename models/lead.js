const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  emailn: {
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

module.exports = mongoose.model('lead', LeadSchema);
