const express = require('express');
const app = express();
const userRoutes = require('./routes/user-routes');
const ticketRoutes = require('./routes/ticket-routes');
const authRoutes = require('./routes/auth-routes');

//Server settings
app.set('port', process.env.PORT  || 8080);
app.set('json spaces', 2);
app.use(express.json());

//Routes
app.use(userRoutes);
app.use(ticketRoutes);
app.use(authRoutes);

//Start the server
app.listen(app.get('port'), ()=>{
    console.log('Server listening on port '+app.get('port'));
});