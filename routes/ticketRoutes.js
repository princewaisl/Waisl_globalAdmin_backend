const express = require('express');
const router = express.Router();
const { createTicket,getTickets } = require('../controllers/ticketController');

router.post('/auth/tickets', createTicket);

router.get('/auth/getticketsData', getTickets);

module.exports = router;
