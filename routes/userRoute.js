const userRouter = require('express').Router();

const usersController = require('../controllers/userController');
const JwtMiddleware = require('../middlewares/JWTMiddleware');

userRouter.route('/').get(JwtMiddleware, usersController.getAllusersHandler);

userRouter.route('/login').post(usersController.loginUserHandler);

userRouter.route('/register').post(usersController.createUserHandler);

userRouter.route('/:id').get(JwtMiddleware, usersController.getUserByIdHandler)
    .patch(JwtMiddleware, usersController.updateUserHandler);

module.exports = userRouter;