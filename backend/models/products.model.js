const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    farmer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productName: {
        type: String
    },
    quantity: {
        type: Number
    },
    productPrice: {
        type: Number
    },
    productDescription: {
        type: String
    },
    productImage: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);