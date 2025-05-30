const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { createTicket,getTickets,updateTicketStatus } = require('../controllers/ticketController');

router.post('/auth/tickets',upload.single('attachment'), createTicket);

router.get('/auth/getticketsData', getTickets);
router.put('/auth/tickets/:ticketId', updateTicketStatus);

module.exports = router;
