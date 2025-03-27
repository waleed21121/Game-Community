const {check} = require('express-validator');

const nameChecker = check('name')
    .notEmpty().withMessage('The name is required')
    .isLength({min: 3}).withMessage('The name must be at least three characters');

const emailChecker = check('email')
    .notEmpty().withMessage('The email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail().withMessage('Invalid email format')
    .custom((value) => {
        if (!value.endsWith('@gameio.com')) {
            throw new Error('Email must be from gameio.com domain');
        }
        return true;
    }).withMessage('Please provide a valid gameio.com email address');

const passwordChecker = check('password')
    .notEmpty().withMessage('The password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')

const steamIdChecker = check('steamId')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .matches(/^\d{17}$/)
    .withMessage('Steam ID must be a 17-digit number');

const registerValidators = [nameChecker, emailChecker, passwordChecker, steamIdChecker];
const loginValidators = [emailChecker, passwordChecker];
const updatedUserValidators = [nameChecker, steamIdChecker];

module.exports = {
    registerValidators,
    loginValidators,
    updatedUserValidators
};