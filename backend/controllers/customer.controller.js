const Customer = require('../models/customer.model');
/**
 * 
exports.postCustomer = (req, res, next) => {
    const customer = req.body;
    Customer.create(customer)
        .then(customer => {
            res.json({ success: true, data: customer })
            console.log(customer)
        })
        .then(err => { success: false, err })

};
exports.getCustomer = (req, res, next) => {
    const customer = req.body;
    Customer.find()
        .then(customer => {
            res.json({ success: true, data: customer })
            console.log(customer)
        })
        .then(err => { success: false, err })

};
exports.deleteCustomer = (req, res, next) => {
    const id = req.query.id;
    Customer.findByIdAndDelete({ _id: id })
        .then(customer => res.json({ success: true, data: "Customer succesfully deleted" }))
        .catch(err => res.json({ success: false, err }))

};

 */

 //getFarmers
 //signup
 //signin
 //addToCart
