const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  ticketID: {
    type: Number,
    required: true,
    unique: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Pending'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  },
  replyed_date: {
    type: Date,
    default: ""
  }
});

module.exports = mongoose.model('ticket', TicketSchema);
