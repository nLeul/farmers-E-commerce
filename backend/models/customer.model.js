const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipcode: {
        type: String
    },
    phone_number: {
        type: Number
    }

});

module.exports = mongoose.model('Customer', customerSchema);