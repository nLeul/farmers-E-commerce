const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// const customerRouter = require('./routes/customer.routes');
const userRouter = require('./routes/user.routes');


// app.use('/api/v1', customerRouter);
app.use('/api/v1/users', userRouter);
module.exports = app;
