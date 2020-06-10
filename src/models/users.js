const Sequelize = require('sequelize');
const connection = require('../database/database');
const ticket = require('./tickets');

const USER = connection.define('users',{
    id_user:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name_user:{
        type: Sequelize.TEXT
    },
    email_user:{
        type: Sequelize.TEXT
    },
    pass_user:{
        type: Sequelize.TEXT
    },
    state_user:{ 
        type: Sequelize.BOOLEAN
    },
    token:{
        type: Sequelize.TEXT
    },
    type_user:{
        type: Sequelize.TEXT
    }
},{
     timestamps: false 
});

USER.hasMany(ticket, { foreingKey:'id_user', sourceKey:'id_user' });
ticket.belongsTo(USER, { foreingKey:'id_user', sourceKey:'id_user' });

module.exports = USER; 