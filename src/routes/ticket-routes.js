const { Router } = require('express');
const router = Router();
const controller = require('../controllers/ticketController');
const auth = require('../controllers/authController');

//List of all tickets from db
router.get('/api/v1/all_tickets/', auth.validateToken, controller.getAllTickets);

//Create a new Ticket
router.post('/api/v1/create_ticket/', auth.validateToken, controller.createTicket);

//Get the list of tickets by an user from db using an id
router.get('/api/v1/ticketsByUser/:iduser', auth.validateToken, controller.getTicketsByUser);

//Get one ticket from db using an id
router.get('/api/v1/one_ticket/:idticket', auth.validateToken, controller.getOneTicket);

//Delete one ticket from db using an id
router.delete('/api/v1/delete_ticket/:idticket', auth.validateToken, controller.deleteOneTicket);

//Update a ticket in db using new data and one id
router.put('/api/v1/update_ticket/:idticket', auth.validateToken, controller.updateOneTicket);

module.exports = router;  