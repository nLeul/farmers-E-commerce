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
userRouter.get('/admin', userController.getAllAccounts);//get user by user id// for super user



//order
userRouter.get('/orders/transactions', userController.getAllOrders);//get all transactions for superuser
userRouter.get('/orders', userController.filterOrders);//Farmers  see all orders and filter them by status.
userRouter.get('/:customerId/orders', userController.getOrderHistory);//Customers can see their orders history and filter by date and status.
userRouter.patch('/farmers/', userController.updateStatusToComplete);//order is picked up, farmers updates order status to ‘complete’.
userRouter.patch('/farmers/:orderIdFromReady', userController.updateStatusToReadyandSendEmail);//farmer set order ready and pick up time and send email
  

//reputation
userRouter.patch('/:farmerId/reputation/:score', userController.changeReputation);//farmer set order ready and pick up time and send email


userRouter.patch('/:usrId/admin', userController.changePassword);//super user change passwords
userRouter.get('/:userId', userController.getUser);//get user by user id



module.exports = userRouter;