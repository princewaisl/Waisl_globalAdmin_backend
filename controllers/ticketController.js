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
      categoryType,
      created_by,
      emp_id,
      email_id
    } = req.body;
    const attachment = req.file ? req.file.path : null;

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
      attachment: attachment, // ✅ Save uploaded file path
      categoryType: categoryType || null,
      status: false,
      created_by,
      created_at: new Date(),
      updated_by: null,
      updated_at: null,
      deleted_at: null,
      deleted_by: null,
      emp_id,
      email_id
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


// const getTickets = async (req, res) => {
//   try {
//     const tickets = await Ticket.findAll({
//       // Optionally add ordering or filters here, e.g.:
//       order: [['created_at', 'DESC']]
//     });

//     res.status(200).json(tickets);
//   } catch (error) {
//     console.error('Error fetching tickets:', error);
//     res.status(500).json({ message: 'Failed to fetch tickets', error: error.message });
//   }
// };


const getTickets = async (req, res) => {
  try {
    // Fetch all tickets
    const tickets = await Ticket.findAll({
      order: [['created_at', 'DESC']]
    });

    // Count summary by status
    const total = await Ticket.count();
    const pending = await Ticket.count({ where: { status: false } });
    const approved = await Ticket.count({ where: { status: 'approved' } });
    const rejected = await Ticket.count({ where: { status: 'rejected' } });

    // Send tickets with summary
    res.status(200).json({
      summary: {
        totalTickets: total,
        pendingTickets: pending,
        approvedTickets: approved,
        rejectedTickets: rejected
      },
      tickets
    });

  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Failed to fetch tickets', error: error.message });
  }
};


// const updateTicketStatus = async (req, res) => {
//   try {
//     const ticketId = req.params.ticketId;
//     const { status, adminComment, updated_by } = req.body;

//     if (!status || !['approved', 'rejected'].includes(status)) {
//       return res.status(400).json({ message: 'Invalid or missing status' });
//     }

//     if (!updated_by) {
//       return res.status(400).json({ message: 'Missing updated_by field' });
//     }

//     const ticket = await Ticket.findByPk(ticketId);
//     if (!ticket) {
//       return res.status(404).json({ message: 'Ticket not found' });
//     }

//     // Merge existing additional_data with new comment
//     const existingData = ticket.additional_data || {};
//     const updatedData = {
//       ...existingData,
//       Comments: adminComment || ''
//     };

//     await ticket.update({
//       status,
//       updated_by,
//       updated_at: new Date(),

//       admin_remarks: updatedData 
//     });

//     res.status(200).json({ message: 'Ticket updated successfully', ticket });

//   } catch (error) {
//     console.error('Error updating ticket:', error);
//     res.status(500).json({ message: 'Failed to update ticket', error: error.message });
//   }
// };


const updateTicketStatus = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const { status, adminComment, updated_by } = req.body;

    // Validate status
    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid or missing status' });
    }

    // Validate updater
    if (!updated_by) {
      return res.status(400).json({ message: 'Missing updated_by field' });
    }

    // Find ticket
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Update ticket with new status and admin remarks
    await ticket.update({
      status,
      updated_by,
      updated_at: new Date(),
      admin_remarks: adminComment || null  // ✅ Store only the comment string here
    });

    res.status(200).json({ message: 'Ticket updated successfully', ticket });
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ message: 'Failed to update ticket', error: error.message });
  }
};




module.exports = { createTicket,getTickets,updateTicketStatus };
