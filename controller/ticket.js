const Ticket = require('../models/Ticket');

const fetchTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({_id: -1}).populate('sender', ['name', 'email']);
    res.json({data: tickets});
  } catch (error) {
    console.error(error);
    res.status(500).send({msg: "Server Error"});
  }
}

const fetchTicketsByUser = async (req, res) => {
  try {
    const tickets = await Ticket.find({sender: req.user.id}, {
      title: 1,
      ticketID: 1,
      created_date: 1,
      replyed_date: 1,
      status: 1
    })
    .sort({_id: -1})
    res.json({data: tickets});
  } catch (error) {
    console.error(error);
    res.status(500).send({msg: "Server Error"});
  }
}

const placeTicket = async (req, res) => {
  try {
    const { title, message } = req.body;

    const lastTicketID = await Ticket.find({}, {ticketID: 1}).sort({_id: -1}).limit(1);
    
    const ticketID = lastTicketID.length ? lastTicketID[0].ticketID + 1 : 1;

    const sender = req.user.id;

    const newTicket = new Ticket({
      ticketID,
      sender,
      title,
      message,
    })

    await newTicket.save().then(ticket => res.json(ticket));
  } catch (error) {
    console.error(error);
    res.status(500).send({msg: "Server Error"});
  }
}

const replyTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyTxt } = req.body;

    const date = new Date();

    const ticket = await Ticket.findByIdAndUpdate(id, {
      status: "Closed",
      replyed_date: date
    }, {new: true});

    res.json({data: ticket})
  } catch (error) {
    console.error(error);
    res.status(500).send({msg: "Server Error"});
  }
}

module.exports = {
  fetchTickets,
  placeTicket,
  replyTicket,
  fetchTicketsByUser
}
