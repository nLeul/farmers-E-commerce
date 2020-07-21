const User = require('../models/user.model');
const Product = require('../models/products.model');
const Order = require('../models/order.model');


exports.addProduct = async (req, res, next) => {
    console.log("add product")
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
    const custId = req.params.custId
    const { prodId, quantity } = req.body;
    const product = await Product.findById(prodId);
    const foundUser = await User.findById(custId);

    if (foundUser) {
        const foundIndex = foundUser.cart.cart_items.findIndex(product => product.prodId == prodId);
        if (foundIndex === -1) {
            foundUser.cart.cart_items.push(req.body);
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
    console.log("get all products by farmer id")
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
    console.log("get by product product id ")
    const { productId} = req.params;
    // console.log( productId, )
    try {

        const products = await Product.findOne({ _id: productId });
        return res.status(200).json({ succes: true, data: products });

    }
    catch (err) {
        return res.status(400).json({ status: false, err: "Error Occured" });
    }
}

exports.deleteProduct = async (req, res, next) => {
    const { prodId } = req.query;
    console.log(prodId);
    // const { farmer_id } = req.query;
    // console.log(farmer_id);
    const product = await Product.deleteOne({ _id: prodId});
    // console.log(product);
    return res.status(200).json({ succes: true, data: product });
};

exports.deleteAllProduct = async (req, res, next) => {
    const { farmerId } = req.params;
    const product = await Product.deleteMany({ farmer_id: farmerId });
    return res.status(200).json({ succes: true, data: "All products Succesfully deleted" });
};

exports.updateProduct = async (req, res, next) => {
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
    const { pending, ready, complete } = req.query;
    try {
        // const order = await Order.find();
        const pending_order = await Order.find({ order_status: pending });
        const ready_order = await Order.find({ order_status: ready });
        const complete_order = await Order.find({ order_status: complete });

        return res.status(200).json({
            succes: true, data: {
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
    try {
        const { orderId } = req.params;
        const { order_status } = req.body;
        console.log(orderId);
        console.log(order_status);
        const completedOrders = await Order.findByIdAndUpdate({ _id: orderId }, { order_status: order_status }, { new: true });
        return res.status(201).json({ status: true, data: completedOrders });

    }
    catch (err) {
        return res.status(400).json({ status: false, err: "Error Occured" });
    }

}
exports.updateStatusToReadyandSendEmail = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { order_status, firstname, lastname, email } = req.body;
        const { pickup_date } = req.body;
        const date = new Date(pickup_date);

        let d = date.getDate();
        let m = date.getMonth() + 1;
        let y = date.getYear() + 1920;
        console.log(convertedDate);
        const convertedDate = y - m - d;
        const completedOrders = await Order.findByIdAndUpdate({ _id: orderId }, { order_status: order_status, pickup_date: convertedDate }, { new: true });
        return res.status(201).json({ status: true, data: completedOrders });

    }
    catch (err) {
        return res.status(400).json({ status: false, err: "Error Occured" });
    }

}