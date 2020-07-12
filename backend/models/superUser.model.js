const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const superUserSchema = new Schema({
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
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Cart'
    },
    list_of_customers: {
        customers_list: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Customer'
        }]
    },

    farmers_list: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Farmer'
    }]
    ,
    orders_list: [
        {
            order_id: { type: Schema.Types.ObjectId, ref: 'Order' }
        }
    ]
});

module.exports = mongoose.model('SuperUser', superUserSchema);