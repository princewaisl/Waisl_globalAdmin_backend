const Ticket = require('../models/Ticket');

const createTicket = async (req, res) => {
  try {
    const {
      description,
      category,
      location,
      sub_category,
      ticketDetails,
      additional_data,
      attachment,
      categoryType,
      created_by,
      emp_id
    } = req.body;

    // Basic validation
    if (!description || !category || !location || !sub_category || !created_by) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newTicket = await Ticket.create({
      description,
      category,
      location,
      sub_category,
      ticketDetails,
      additional_data: additional_data || null,
      attachment: attachment || null,
      categoryType: categoryType || null,
      status: false,
      created_by,
      created_at: new Date(),
      updated_by: null,
      updated_at: null,
      deleted_at: null,
      deleted_by: null,
      emp_id
    });

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket: newTicket
    });

  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Failed to create ticket', error: error.message });
  }
};


const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      // Optionally add ordering or filters here, e.g.:
      order: [['created_at', 'DESC']]
    });

    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Failed to fetch tickets', error: error.message });
  }
};

module.exports = { createTicket,getTickets };
