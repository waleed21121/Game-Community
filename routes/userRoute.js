const userRouter = require('express').Router();

const usersController = require('../controllers/userController');
const JwtMiddleware = require('../middlewares/JWTMiddleware');

const errorMiddlewareHandler = require('../middlewares/errorHandlerMiddleware');

const idValidationMiddleware = require('../middlewares/idValidator');

const validationResultMiddleware = require('../middlewares/validationResults');
const {registerValidators, loginValidators, updatedUserValidators} = require('../validators/userValidators');

userRouter.route('/').get(JwtMiddleware, errorMiddlewareHandler(usersController.getAllusersHandler));

userRouter.route('/login').post(loginValidators, validationResultMiddleware, errorMiddlewareHandler(usersController.loginUserHandler));

userRouter.route('/register').post(registerValidators, validationResultMiddleware, errorMiddlewareHandler(usersController.createUserHandler));

userRouter.route('/:id').get(JwtMiddleware, idValidationMiddleware, errorMiddlewareHandler(usersController.getUserByIdHandler))
    .patch(JwtMiddleware, idValidationMiddleware, updatedUserValidators, validationResultMiddleware, errorMiddlewareHandler(usersController.updateUserHandler));

module.exports = userRouter;