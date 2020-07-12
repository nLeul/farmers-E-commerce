const Farmer = require('../models/farmers.model');
const Product = require('../models/products.model');

exports.addProduct = (req, res, next) => {
    Product.create(req.body)
        .then(product => {
            res.status(200).json({ status: true, data: product });
        })
        .catch(err => {
            res.status(400).json({ status: false, err });
        })
};