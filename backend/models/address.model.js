const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const billingAddressSchema = new Schema({
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
})

module.exports = mongoose.model('BillingAdress', billingAddressSchema);
