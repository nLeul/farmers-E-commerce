const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 8080
const MONGODB_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PSW}@cluster0.klqns.gcp.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen(PORT, () => console.log(`App running on ${PORT} and ${MONGODB_URL} `));
    })
    .catch(err => console.log(err))

