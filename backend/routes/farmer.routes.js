const farmerRouter = require('express').Router();
const farmerController = require('../controllers/farmer.controller');


farmerRouter.post('/', farmerController.addProduct);

module.exports = farmerRouter;