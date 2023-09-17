const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(morgan('dev'));
require('dotenv').config();
app.use(cors());

require('./db/mongodb'); // to connect to database



//Login routing
const userRoute = require('./routes/userRoute')
app.use('/api', userRoute); 



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running in PORT ${PORT}`);
});