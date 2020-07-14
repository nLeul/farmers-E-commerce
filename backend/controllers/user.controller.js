const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
const Product = require('../models/products.model');
const Order = require('../models/order.model');


exports.addProduct = async (req, res, next) => {
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

exports.login = async (req, res, next) => {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });

    if (!email || !password) {
        res.status(400).json({
            success: false,
            errMessage: "Please provide an email,password and role",
        });
        return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400).json({ success: false, errMessage: "Invalid Username and Password" });
        return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME,
    });
    res.status(200).json({ success: true, token, user });
};


exports.signup = async (req, res, next) => {
    const { email } = req.body;
    User.findOne({ email: email }).then(async (user) => {


        if (user) {
            res.json({ success: false, data: "Email already in use!" });
        } else {
            const { firstname, lastname, role, email, phone_number } = req.body;
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);
            const newUser = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                role: role,
                phone_number: phone_number
            }
            User.create(newUser)
                .then(user => res.json({ success: true, data: "created succesfully!", user }))
                .catch(err => res.json({ success: false, err }));
        }

    })

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
            order_items: foundUser.cart.cart_items,
            order_quantity: foundUser.cart.totalQuantity,
            order_total: foundUser.cart.totalPrice
        });
        foundUser.cart.cart_items = [];
        foundUser.cart.totalQuantity = 0;
        foundUser.cart.totalPrice = 0;

        foundUser.orders.push(order);
        for (let i = 0; i < order.order_items.length; i++) {
            const product = await Product.find({ _id: order.order_items[i].prodId });
            console.log("product", product)
            product.filter((eachProduct, i) => {
                console.log("eachProduct.quantity", eachProduct.quantity);
                console.log("order.order_items.quantity", order.order_items[i].quantity);
                console.log(eachProduct._id, order.order_items[i].prodId);
                if (eachProduct._id === order.order_items[i].prodId) {
                    eachProduct.quantity -= order.order_items[i].quantity;

                }
                eachProduct.save();
            });
        }


        const result = await User.findByIdAndUpdate(custId, foundUser, { new: true })
        return res.status(200).json({ succes: true, data: result });
    }
    else {
        return res.status(404).json({ success: false, err: "user not found" });
    }

};

exports.getInventory = async (req, res, next) => {
    console.log("inside getInventory");
    const { farmerId } = req.query;
    try {
        const products = await Product.find({ farmer_id: farmerId });
        return res.status(200).json({ succes: true, data: products });
    }
    catch (err) {
        return res.status(400).json({ status: false, err: "Error Occured" });
    }
}

exports.deleteProduct = async (req, res, next) => {
    const { prodId } = req.query;
    const product = await Product.findByIdAndDelete({ _id: prodId }, { new: true });
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
    console.log("inside get all farmers");
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
    console.log("inside filter");
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