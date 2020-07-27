const User = require('../models/user.model');
const Product = require('../models/products.model');
const Order = require('../models/order.model');
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const { sendEmailToCustomer } = require('../services/sendEmail');
const { findByIdAndUpdate } = require('../models/user.model');


exports.addProduct = async (req, res, next) => {
    console.log("addProduct");

    const { farmer_id, productName, quantity, productPrice, productDescription, productImage } = req.body
    try {
        const foundProduct = await Product.findOne({ productName: req.body.productName });
        if (foundProduct) {
            const quantity1 = foundProduct.quantity + quantity;
            const product = await Product.findOneAndUpdate({ productName: req.body.productName }, {
                productName: productName,
                quantity: quantity1,
                productPrice: productPrice,
                productDescription: productDescription,
                productImage: productImage,
            }, { new: true });
            return res.status(201).json({ status: true, data: product });
        }
        else {
            const product = await Product.create(req.body);
            const farmer = await User.findById({ _id: farmer_id });
            farmer.products.push(product._id)
            farmer.save();
            return res.status(201).json({ status: true, data: product });
        }

    }
    catch (err) {
        return res.status(400).json({ status: false, err });
    }
};

exports.addToCart = async (req, res, next) => {
    console.log("addToCart");
    let { custId, prodId, quantity } = req.params
  
    quantity = Number(quantity);
    const product = await Product.findById(prodId);
    const foundUser = await User.findById(custId);

    if (foundUser) {
        const foundIndex = foundUser.cart.cart_items.findIndex(product => product.prodId == prodId);
        if (foundIndex === -1) {
            foundUser.cart.cart_items.push({
                prodId: prodId,
                quantity: quantity,
            });
        }
        else {
            foundUser.cart.cart_items[foundIndex].quantity += quantity;
        }
        foundUser.cart.totalQuantity += quantity;
        foundUser.cart.totalPrice += quantity * product.productPrice;
        const result = await User.findByIdAndUpdate(custId, foundUser, { new: true })
        return res.status(200).json({ succes: true, data: result });
    }
    else {
        return res.status(404).json({ succes: false, err: "user not found" });
    }
};

exports.addToOrder = async (req, res, next) => {
    console.log("addToOrder");
    console.log("inside add to order")
    const { custId } = req.params;
    const foundUser = await User.findById(custId);

    if (foundUser) {
        const order = await Order.create({
            customer_id: custId,
            order_items: foundUser.cart.cart_items,
            order_quantity: foundUser.cart.totalQuantity,
            order_total: foundUser.cart.totalPrice
        });
        foundUser.cart.cart_items = [];
        foundUser.cart.totalQuantity = 0;
        foundUser.cart.totalPrice = 0;

        foundUser.orders.push(order);


        //Promise.all([promise1, promise2]).then();

        // add payment method
        // add shipping addresss

        for (let i = 0; i < order.order_items.length; i++) {
            let orderItem = order.order_items[i];
            let { prodId, quantity } = orderItem;
            let foundProduct = await Product.findById(prodId);
            foundProduct.quantity -= quantity;
            let updateProduct = await Product.findByIdAndUpdate(prodId, foundProduct, { new: true });
        }
        /* 
        * 
        * axios.patch('/product/inventory/update, {: 'dkdfkdjfdjfdf', quantity: 3})
        * 
          *  */
        const result = await User.findByIdAndUpdate(custId, foundUser, { new: true })
        return res.status(200).json({ succes: true, data: result });
    }
    else {
        return res.status(404).json({ success: false, err: "user not found" });
    }

};
//get all products by farmer id
exports.getInventory = async (req, res, next) => {
    console.log("getInventory")

    const { farmerId } = req.query;
    try {
        const products = await Product.find({ farmer_id: farmerId });
        return res.status(200).json({ succes: true, data: products });
    }
    catch (err) {
        return res.status(400).json({ status: false, err: "Error Occured" });
    }
}

exports.getInventoryById = async (req, res, next) => {
console.log("getInventoryById")
    const { productId } = req.params;
    try {

        const products = await Product.findOne({ _id: productId });
        return res.status(200).json({ succes: true, data: products });

    }
    catch (err) {
        return res.status(400).json({ status: false, err: "Error Occured" });
    }
}

exports.deleteProduct = async (req, res, next) => {
    console.log("deleteProduct");
    const { prodId } = req.query;
    const product = await Product.deleteOne({ _id: prodId });
    return res.status(200).json({ succes: true, data: product });
};

exports.deleteAllProduct = async (req, res, next) => {
    console.log("deleteAllProduct");
    const { farmerId } = req.params;
    const product = await Product.deleteMany({ farmer_id: farmerId });
    return res.status(200).json({ succes: true, data: "All products Succesfully deleted" });
};

exports.updateProduct = async (req, res, next) => {
    console.log("updateProduct");
    const { prodId } = req.query;
    const { farmer_id, productName, productPrice, productDescription, productImage } = req.body;
    const foundProduct = await Product.findById({ _id: prodId });
    if (foundProduct) {
        const product = await Product.findByIdAndUpdate({ _id: prodId }, {
            farmer_id: farmer_id,
            productName: productName,
            productPrice: productPrice,
            productDescription: productDescription,
            productImage: productImage
        }, { new: true })
        return res.status(200).json({ succes: true, data: product });
    }
    return res.status(404).json({ success: false, err: "product not found" });

};

exports.getAllFarmers = async (req, res, next) => {
    console.log("getAllFarmers");
    try {
        const farmer = await User.find({ role: "farmer" });
        if (farmer) {
            return res.status(200).json({ succes: true, data: farmer });
        }
        else {
            return res.status(200).json({ succes: true, err: "farmer not found" });
        }

    }
    catch (err) {
        return res.status(400).json({ status: false, err: "Error Occured" });
    }
}
exports.filterOrders = async (req, res, next) => {
    console.log("filterOrders");
    const { pending, ready, complete } = req.query;
    console.log("inside filter orders")
    try {
        const allOrders = await Order.find();
        const pending_order = await Order.find({ order_status: pending });
        const ready_order = await Order.find({ order_status: ready });
        const complete_order = await Order.find({ order_status: complete });

        return res.status(200).json({
            succes: true, data: {
                allOrders:allOrders,
                pending: pending_order,
                ready: ready_order,
                complete: complete_order
            }
        });
    }
    catch (err) {
        return res.status(400).json({ status: false, err: "Error Occured" });
    }
}
exports.getOrderHistory = async (req, res, next) => {
    console.log("getOrderHistory");
    try {
        let { customerId } = req.params;
        const customerOrders = await Order.find({ customer_id: customerId });
        return res.status(201).json({ status: true, data: customerOrders });
    }
    catch (err) {
        return res.status(400).json({ status: false, err: "Error Occured" });
    }

}
exports.updateStatusToComplete = async (req, res, next) => {
    console.log("updateStatusToComplete");
    try {

        const { orderId } = req.query;
        const { order_status } = req.body;


        const completedOrders = await Order.findByIdAndUpdate({ _id: orderId }, { order_status: order_status }, { new: true });
        return res.status(201).json({ status: true, data: completedOrders });

    }
    catch (err) {
        return res.status(400).json({ status: false, err: "Error Occured" });
    }

}
exports.updateStatusToReadyandSendEmail = async (req, res, next) => {
    console.log("updateStatusToReadyandSendEmail");
    try {
        const { orderIdFromReady } = req.params;
        const { order_status, firstname, lastname, email } = req.body;
        const { pickup_date } = req.body;

        const completedOrders = await Order.findByIdAndUpdate({ _id: orderIdFromReady }, { order_status: order_status, pickup_date: pickup_date }, { new: true });
        const user = await User.findOne({ _id: completedOrders.customer_id });

        //    sendEmailToCustomer(user.email,pickup_date);


        return res.status(200).json({ status: true, data: completedOrders });

    }
    catch (err) {
        return res.status(400).json({ status: false, err: "Error Occured" });
    }

}

exports.getUser = async (req, res, next) => {
    console.log("getUser");
    try {
        const { userId } = req.params;
        const user = await User.findById({ _id: userId });
        return res.status(201).json({ status: true, data: user });
    } catch (error) {
        return res.status(400).json({ status: false, error: "Error Occured" });
    }

}

exports.changeReputation = async (req, res, next) => {
    console.log("changeReputation");
    try {
        const { farmerId, score } = req.params;
        const newUser = await User.findById({ _id: farmerId })
        const newrep = newUser.reputation += Number(score)

        const user = await User.findByIdAndUpdate({ _id: farmerId }, { reputation: newrep }, { new: true });
        return res.status(200).json({ status: true, data: user });
    } catch (error) {
        return res.status(400).json({ status: false, error: "Error Occured" });
    }

}

exports.getAllAccounts = async (req, res, next) => {
    console.log("getAllAccounts");
    try {
        const allAcounts = await User.find({ $or: [{ role: "farmer" }, { role: "customer" }] });
        return res.status(200).json({ status: true, data: allAcounts });
    } catch (error) {
        return res.status(400).json({ status: false, error: "Error Occured" });
    }

}
exports.changePassword = async (req, res, next) => {
    console.log("changePassword");
    try {
        const { usrId } = req.params;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const userPassword = await User.findByIdAndUpdate({ _id: usrId },{password:password},{new:true});
        return res.status(200).json({ status: true, data: userPassword });
    } catch (error) {
        return res.status(400).json({ status: false, error: "Error Occured" });
    }

}
// exports.getRole= async (req, res, next) => {
//     console.log("get role");
//     try {
//         return res.status(200).json({ status: true, data: userPassword });
//     } catch (error) {
//         return res.status(400).json({ status: false, error: "Error Occured" });
//     }

// }