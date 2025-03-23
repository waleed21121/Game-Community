const userRouter = require('express').Router();

const usersController = require('../controllers/userController');

userRouter.route('/').get(usersController.getAllusersHandler);

userRouter.route('/login').post(usersController.loginUserHandler);

userRouter.route('/register').post(usersController.createUserHandler);

userRouter.route('/:id').get(usersController.getUserByIdHandler)
    .patch(usersController.updateUserHandler);

module.exports = userRouter;