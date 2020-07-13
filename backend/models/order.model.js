const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    order_status: {
        type: String,
        default: "pending"
    },
    order_date: {
        type: Date,
        default: Date.now
    },
    // shipping_address
    //payment_info
    order_items: [{
        prodId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }],
    order_quantity: {
        type: Number,
        default: 0
    },
    order_total: {
        type: Number,
        default: 0
    }


});

module.exports = mongoose.model('Order', orderSchema);