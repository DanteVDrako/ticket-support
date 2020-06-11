const Ticket = require('../models/tickets');
const User = require('../models/users');

module.exports = { 
    async createTicket(req, res){
        const { id_user, ticket_desc, created_at, time_duration, closed_at, state_ticket } = req.body;
        try{
            if(req.userToken){
                const tecnicos = await User.findAll({
                    where:{
                        type_user:'tech'
                    }
                });
                const electedTech = tecnicos[Math.floor(Math.random()*tecnicos.length)];
                const newTicket = await Ticket.create({
                    id_user: id_user,
                    ticket_desc: ticket_desc,
                    created_at: created_at,
                    time_duration:time_duration,
                    closed_at:closed_at,
                    state_ticket:state_ticket,
                    assigned_to:electedTech.id_user
                },{
                    fields:['id_user', 'ticket_desc', 'created_at', 'time_duration', 'closed_at', 'state_ticket','assigned_to']
                });
                if(newTicket){
                    res.status(200).json({
                        message:"Your ticket was created!",
                        data: newTicket
                    });
                }
            }else{
                res.status(403).json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }
        }catch(err){
            res.status(400).json({ message:"Something failed: "+err.message });
        }
    },
    async getAllTickets(req, res){
        try{
            if(req.userToken){
                const listTickets = await Ticket.findAll({
                    attributes: ['id_ticket','id_user','ticket_desc','created_at','time_duration','closed_at','state_ticket','assigned_to']
                });
                if(listTickets){
                    res.status(200).json({
                        message:"Now take your results!",
                        data: listTickets
                    });
                }
            }else{
                res.status(401).json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }
        }catch(err){
            res.status(400).json({ message:"Something failed: "+err.message });
        }
    },
    async getTicketsByUser(req, res){
        const { iduser } = req.params;
        try{
            if(req.userToken){
                const tickets = await Ticket.findAll({
                    where:{
                        assigned_to: iduser,
                    },
                    attributes: ['id_ticket','id_user','ticket_desc','created_at','time_duration','closed_at','state_ticket','assigned_to']
                    
                }); 
                if(tickets.length > 0){
                    res.status(200).json({
                        message:"Get list of tickets...",
                        data:tickets
                    })
                }else{
                    res.status(400).json({
                        message: "The user hasn't tickets assigned to!"
                    });
                }
            }else{
                res.status(401).json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }    
        }catch(err){
            res.status(400).json({message:"Something failed: "+err.message});
        }
    },
    async getOneTicket(req, res){
        const { idticket } = req.params;
        try{
            if(req.userToken){
                const findedTicket = await Ticket.findOne({
                    where:{
                        id_ticket:idticket
                    },
                    attributes: ['id_ticket','id_user','ticket_desc','created_at','time_duration','closed_at','state_ticket','assigned_to']
                });
                if(findedTicket){
                    res.status(200).json({
                        message:"The Ticket was found",
                        data:findedTicket
                    });
                }
            }else{
                res.status(401).json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }   
        }catch(err){
            res.status(400).json({message:"Something failed: "+err.message});
        }
    },
    async deleteOneTicket(req, res){
        const { idticket } = req.params;
        try{
            if(req.userToken && req.userToken.type_user=='admin'){
                const ticketdeleted = Ticket.destroy({
                    where: { id_ticket: idticket }
                });
                res.status(200).json({ message: "Ticket deleted!" }); 
            }else{
                res.status(401).json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }
        }catch(err){
            res.status(400).json({message:"Something failed: "+err.message});
        }
    },
    async updateOneTicket(req, res){
        const { idticket } = req.params;
        const { id_user, ticket_desc, created_at, time_duration, closed_at, state_ticket,assigned_to} = req.body;
        try{
            if(req.userToken && (req.userToken.type_user=='admin' || req.userToken.type_user=='tech')){
                const ticket = await Ticket.findOne({
                    where:{
                        id_ticket:idticket
                    },
                    attributes: ['id_user','ticket_desc','created_at','time_duration','closed_at','state_ticket','assigned_to']
                }); 
                const updatedticket = await Ticket.update({
                    id_user:id_user,
                    ticket_desc:ticket_desc,
                    created_at:created_at,
                    time_duration:time_duration,
                    closed_at:closed_at,
                    state_ticket:state_ticket,
                    assigned_to:assigned_to
                },{
                    where:{
                        id_ticket:idticket
                    }
                });
                res.status(200).json({
                    message:"The ticket was edited!"
                });
            }else{
                res.status(401).json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }    
        }catch(err){
            res.status(400).json({message:"Something failed: "+err.message});
        }
    }
} 