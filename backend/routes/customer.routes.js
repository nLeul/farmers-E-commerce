const customerRouter = require('express').Router();
const customerController = require('../controllers/customer.controller');

/**
 * customerRouter.post('/customers', customerController.postCustomer);
customerRouter.get('/customers', customerController.getCustomer);
customerRouter.put('/customers', customerController.postCustomer);
customerRouter.delete('/customers', customerController.deleteCustomer);
 *  */

module.exports = customerRouter;