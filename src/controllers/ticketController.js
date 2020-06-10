const Ticket = require('../models/tickets');

module.exports = { 
    async createTicket(req, res){
        const { id_user, ticket_desc, created_at, time_duration, closed_at, state_ticket } = req.body;
        try{
            if(req.userToken){
                const newTicket = await Ticket.create({
                    id_user: id_user,
                    ticket_desc: ticket_desc,
                    created_at: created_at,
                    time_duration:time_duration,
                    closed_at:closed_at,
                    state_ticket:state_ticket
                },{
                    fields:['id_user', 'ticket_desc', 'created_at', 'time_duration', 'closed_at', 'state_ticket']
                });
                if(newTicket){
                    res.json({
                        message:"Your ticket was created!",
                        data: newTicket
                    });
                }
            }else{
                res.json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }
        }catch(err){
            res.json({ message:"Something failed: "+err.message });
        }
    },
    async getAllTickets(req, res){
        try{
            if(req.userToken){
                const listTickets = await Ticket.findAll({
                    attributes: ['id_ticket','id_user','ticket_desc','created_at','time_duration','closed_at','state_ticket']
                });
                if(listTickets){
                    res.json({
                        message:"Now take your results!",
                        data: listTickets
                    });
                }
            }else{
                res.json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }
        }catch(err){
            res.json({ message:"Something failed: "+err.message });
        }
    },
    async getTicketsByUser(req, res){
        const { iduser } = req.params;
        try{
            if(req.userToken){
                const tickets = await Ticket.findAll({
                    where:{
                        id_user: iduser
                    },
                    attributes: ['id_ticket','id_user','ticket_desc','created_at','time_duration','closed_at','state_ticket']
                    
                }); 
                if(tickets){
                    res.json({
                        message:"Get list of tickets...",
                        data:tickets
                    })
                }
            }else{
                res.json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }    
        }catch(err){
            res.json({message:"Something failed: "+err.message});
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
                    attributes: ['id_ticket','id_user','ticket_desc','created_at','time_duration','closed_at','state_ticket']
                });
                if(findedTicket){
                    res.json({
                        message:"The Ticket was found",
                        data:findedTicket
                    });
                }
            }else{
                res.json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }   
        }catch(err){
            res.json({message:"Something failed: "+err.message});
        }
    },
    async deleteOneTicket(req, res){
        const { idticket } = req.params;
        try{
            if(req.userToken && req.userToken.type_user=='admin'){
                const ticketdeleted = Ticket.destroy({
                    where: { id_ticket: idticket }
                });
                res.json({ message: "Ticket deleted!" }); 
            }else{
                res.json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }
        }catch(err){
            res.json({message:"Something failed: "+err.message});
        }
    },
    async updateOneTicket(req, res){
        const { idticket } = req.params;
        const { id_user, ticket_desc, created_at, time_duration, closed_at, state_ticket} = req.body;
        try{
            if(req.userToken && (req.userToken.type_user=='admin' || req.userToken.type_user=='tech')){
                const ticket = await Ticket.findOne({
                    where:{
                        id_ticket:idticket
                    },
                    attributes: ['id_user','ticket_desc','created_at','time_duration','closed_at','state_ticket']
                }); 
                const updatedticket = await Ticket.update({
                    id_user:id_user,
                    ticket_desc:ticket_desc,
                    created_at:created_at,
                    time_duration:time_duration,
                    closed_at:closed_at,
                    state_ticket:state_ticket
                },{
                    where:{
                        id_ticket:idticket
                    }
                });
                res.json({
                    message:"The ticket was edited!"
                });
            }else{
                res.json({
                    auth:false,
                    message:"You don't have permission for this action!"
                });
            }    
        }catch(err){
            res.json({message:"Something failed: "+err.message});
        }
    }
} 