const Sequelize = require('sequelize');
const connection = require('../database/database');

const TICKET = connection.define('tickets',{
    id_ticket: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_user:{
        type: Sequelize.INTEGER
    },
    ticket_desc:{
        type: Sequelize.TEXT
    },
    created_at:{
        type: Sequelize.DATE
    },
    time_duration:{
        type: Sequelize.INTEGER
    },
    closed_at:{
        type: Sequelize.DATE
    },
    state_ticket:{
        type: Sequelize.BOOLEAN
    },
    assigned_to:{
        type: Sequelize.TEXT 
    }
},{
    timestamps: false 
});

module.exports = TICKET;