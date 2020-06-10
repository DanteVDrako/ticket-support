const Sequelize = require('sequelize');
const URI = 'postgres://zmrqodqyxztiad:332dd664fc5b1d6201e9f96dc14f5444007a14d7d443d4f330b58c520cdb104d@ec2-34-198-243-120.compute-1.amazonaws.com:5432/datk7kfc5f72nn';


const connection = new Sequelize(URI,{
    dialect: 'postgres',
    protocol: 'postgres',
    ssl: { 
        rejectUnauthorized: false 
    },
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        keepAlive: true,        
      }, 
    pool:{
        max:20,
        min:0,
        require: 30000,
        idle:10000
    }
});

module.exports = connection;