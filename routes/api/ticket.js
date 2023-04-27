const express = require("express");
const { check } = require('express-validator');

const ticketRouter = express.Router();

const auth = require('../../middleware/auth');

const { fetchTickets, placeTicket, replyTicket, fetchTicketsByUser } = require("../../controller/ticket");

ticketRouter.get('/', auth, fetchTickets);
ticketRouter.post('/user', auth, fetchTicketsByUser);
ticketRouter.post(
  "/", 
  auth,
  check('email', 'Please include a valid email').isEmail(),
  check('title', 'Title is required').notEmpty(),
  check('message', 'Message is required').notEmpty(),
  placeTicket
);
ticketRouter.post(
  '/reply/:id',
  auth,
  replyTicket
)

module.exports =  ticketRouter;
