const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Customer'
    },

    product_list: [
        {
            prdId: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number
        }
    ]
    ,
});

module.exports = mongoose.model('Cart', cartSchema);

