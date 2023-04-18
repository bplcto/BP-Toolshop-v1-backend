const mongoose = require('mongoose');

const PremiumShopSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  sitename: {
    type: String,
    required: true,
  },
  information: {
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

module.exports = mongoose.model('premiumshop', PremiumShopSchema);
