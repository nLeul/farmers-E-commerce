const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
const Product = require('../models/products.model');
const Order = require('../models/order.model');


exports.addProduct = async (req, res, next) => {

    try {
        const product = await Product.create(req.body);
        return res.status(201).json({ status: true, data: product });
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
    console.log(prodId);
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
        // console.log(order)
        foundUser.cart.cart_items = [];
        foundUser.cart.totalQuantity = 0;
        foundUser.cart.totalPrice = 0;

        foundUser.orders.push(order);
        const result = await User.findByIdAndUpdate(custId, foundUser, { new: true })
        return res.status(200).json({ succes: true, data: result });
    }
    else {
        return res.status(404).json({ success: false, err: "user not found" });
    }

};