const express = require('express');
const router = express.Router();
const { createTicket,getTickets,updateTicketStatus } = require('../controllers/ticketController');

router.post('/auth/tickets', createTicket);

router.get('/auth/getticketsData', getTickets);
router.put('/auth/tickets/:ticketId', updateTicketStatus);

module.exports = router;
