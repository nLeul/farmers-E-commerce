const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const protect = require('./middleware/auth').routeProtection;

app.use(cors());
app.use(bodyParser.json());

// const customerRouter = require('./routes/customer.routes');
const userRouter = require('./routes/user.routes');
const publicRouter=require('./routes/auth.routes')

// app.use('/api/v1', customerRouter);
app.use('/api/v1/users', publicRouter);
app.use('/api/v1/users',protect, userRouter);
module.exports = app;
