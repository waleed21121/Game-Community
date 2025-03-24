const userRouter = require('express').Router();

const usersController = require('../controllers/userController');
const JwtMiddleware = require('../middlewares/JWTMiddleware');

const errorMiddlewareHandler = require('../middlewares/errorHandlerMiddleware');

userRouter.route('/').get(JwtMiddleware, errorMiddlewareHandler(usersController.getAllusersHandler));

userRouter.route('/login').post(errorMiddlewareHandler(usersController.loginUserHandler));

userRouter.route('/register').post(errorMiddlewareHandler(usersController.createUserHandler));

userRouter.route('/:id').get(JwtMiddleware, errorMiddlewareHandler(usersController.getUserByIdHandler))
    .patch(JwtMiddleware, errorMiddlewareHandler(usersController.updateUserHandler));

module.exports = userRouter;