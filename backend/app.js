const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(morgan('dev'));
require('dotenv').config();
app.use(cors());

require('./db/mongodb'); // to connect to database

 

//Login routing
const loginRoute = require('./routes/loginRoute')
app.use('/api', loginRoute);

//User module routing
const userRoute=require('./routes/userRoute');
app.use('/api',userRoute);

//Books module routing
const bookRoute = require('./routes/bookRoute'); 
app.use('/api', bookRoute);

//Rent module routing
const rentRoute = require('./routes/rentRoute'); 
app.use('/api', rentRoute);

//Home module routing
const homeRoute = require('./routes/homeRoute'); 
app.use('/api', homeRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running in PORT ${PORT}`);
});