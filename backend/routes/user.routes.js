const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');



//farmer
// Add, Delete, Update, Retrieve products
userRouter.post('/products', userController.addProduct);//add product
userRouter.get('/products', userController.getInventory);//Retrieve products -->farmer get products & customer get products
userRouter.get('/products/:productId', userController.getInventoryById);//Retrieve products -->farmer get products & customer get products

userRouter.delete('/products', userController.deleteProduct);//Delete
userRouter.delete('/products/:farmerId', userController.deleteAllProduct);//Delete all
userRouter.patch('/products', userController.updateProduct);//Update



//customer
userRouter.get('/farmers', userController.getAllFarmers);// customer browse all farmers
// userRouter.get('/products', userController.getInventory);//customer  browse all products
userRouter.patch('/:custId/products/:prodId/cart/:quantity', userController.addToCart);//add to cart
userRouter.patch('/:custId/orders', userController.addToOrder);//add to order and clear cart


//order
userRouter.get('/orders', userController.filterOrders);//Farmers  see all orders and filter them by status.
userRouter.get('/:customerId/orders', userController.getOrderHistory);//Customers can see their orders history and filter by date and status.
userRouter.patch('/farmers/', userController.updateStatusToComplete);//order is picked up, farmers updates order status to ‘complete’.
userRouter.patch('/farmers/:orderIdFromReady', userController.updateStatusToReadyandSendEmail);//farmer set order ready and pick up time and send email
    
module.exports = userRouter;