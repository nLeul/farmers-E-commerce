const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    role: {
        type: String
    },
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
    phone_number: {
        type: Number
    },
    reputation: {
        type: Number,
        default:0
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    orders: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Order'
    }],
    cart: {
        cart_items: [{
            prodId: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number
        }],
        totalQuantity: {
            type: Number,
            default: 0
        },
        totalPrice: {
            type: Number,
            default: 0
        }
    }

});


module.exports = mongoose.model('User', userSchema);