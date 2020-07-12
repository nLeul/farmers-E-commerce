const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const farmerSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    phone_number: { type: Number },
    product_list: [
        {
            prdId: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number
        }
    ]

});

module.exports = mongoose.model('Farmer', farmerSchema);