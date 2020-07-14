const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');

userRouter.post('/signup', userController.signup);//signup user
userRouter.post('/signin', userController.login);//signin user

//farmer
// Add, Delete, Update, Retrieve products
userRouter.post('/products', userController.addProduct);//add product
userRouter.get('/products', userController.getInventory);//Retrieve products -->farmer get products & customer get products
userRouter.delete('/products', userController.deleteProduct);//Delete
userRouter.delete('/products/:farmerId', userController.deleteAllProduct);//Delete all
userRouter.patch('/products', userController.updateProduct);//Update
 


//customer
userRouter.get('/farmers', userController.getAllFarmers);// customer browse all farmers
// userRouter.get('/products', userController.getInventory);//customer  browse all products
userRouter.patch('/:custId', userController.addToCart);//add to cart
userRouter.patch('/:custId/orders', userController.addToOrder);//add to order and clear cart

//order
userRouter.get('/orders', userController.filterOrders);//Farmers  see all orders and filter them by status.

module.exports = userRouter;