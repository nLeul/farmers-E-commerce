const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');

userRouter.post('/signup', userController.signup);//signup farmer
userRouter.post('/signin', userController.login);//signin farmer
userRouter.post('/products', userController.addProduct);//add product
userRouter.patch('/:custId', userController.addToCart);//add to cart
userRouter.patch('/:custId/orders', userController.addToOrder);//add to order and clear cart

module.exports = userRouter;