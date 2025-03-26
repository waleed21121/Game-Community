const userRouter = require('express').Router();

const usersController = require('../controllers/userController');
const JwtMiddleware = require('../middlewares/JWTMiddleware');

const errorMiddlewareHandler = require('../middlewares/errorHandlerMiddleware');

const idValidationMiddleware = require('../middlewares/idValidator');

userRouter.route('/').get(JwtMiddleware, errorMiddlewareHandler(usersController.getAllusersHandler));

userRouter.route('/login').post(errorMiddlewareHandler(usersController.loginUserHandler));

userRouter.route('/register').post(errorMiddlewareHandler(usersController.createUserHandler));

userRouter.route('/:id').get(JwtMiddleware, idValidationMiddleware, errorMiddlewareHandler(usersController.getUserByIdHandler))
    .patch(JwtMiddleware, idValidationMiddleware, errorMiddlewareHandler(usersController.updateUserHandler));

module.exports = userRouter;