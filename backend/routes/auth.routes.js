const publicRouter = require('express').Router();
const publicController = require('../controllers/auth.controller');


publicRouter.post('/signup', publicController.signup);//signup user
publicRouter.post('/signin', publicController.login);//signin user


module.exports = publicRouter;