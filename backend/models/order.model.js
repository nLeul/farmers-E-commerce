const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    order_status: {
        type: String
    },
    created_at: {
        type: String
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Cart'
    }


});

module.exports = mongoose.model('Order', orderSchema);