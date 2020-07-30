const express = require('express');
const app = express();
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const protect = require('./middleware/auth').routeProtection;

// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
// app.use(morgan('combined', { stream: accessLogStream }))

app.use(cors());
app.use(bodyParser.json());


const userRouter = require('./routes/user.routes');
const publicRouter=require('./routes/auth.routes')

app.get('/', (req, res,next) => {
    res.status(200).json({
        success: true,
        data: [{
            name: "leul necha",
            email: "leulnecha@gmail.com",
            message:"API works Succesfully"
        }]
    })
    next();
})
app.use('/api/v1/users', publicRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
