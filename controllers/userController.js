const bcrypt = require('bcrypt');

const {createUser, getUserByEmail, getUserById, getQueryObject, updateUser} = require('../services/userService');
const ApiFeatures = require('../utils/apiFeatures');
const generateToken = require('../utils/generateToken');
const verifyToken = require('../utils/verifyToken');

async function createUserHandler(req, res, next) {
    const { name, email, password, steamId } = req.body;
    
    const user = await getUserByEmail(email);
    if(user) {
        // TODO: handle error
        return res.status(400).json({
            status: 'error',
            message: 'User already exists'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        name,
        email,
        password: hashedPassword,
        steamId
    };
    
    const createdUser = await createUser(newUser);

    const payload = {email: createdUser.email, id: createdUser.id, steamId: createdUser.steamId};
    const token = await generateToken(payload);
    
    res.status(201).json({
        status: 'success',
        data: {
            newUser,
            token: token
        }
    });
}

async function loginUserHandler(req, res, next) {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if(!user) {
        // TODO: handle error
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        // TODO: handle error
        return res.status(401).json({
            status: 'error',
            message: 'Invalid credentials'
        });
    }
    const payload = {email: user.email, id: user.id, steamId: user.steamId};
    const token = await generateToken(payload);

    res.status(200).send({
        status:'success',
        data: {
            user,
            token: token
        }
    })
}

async function getUserByIdHandler(req, res, next) {
    const user = await getUserById(req.params.id);
    if(!user) {
        // TODO: handle error
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }
    res.status(200).json({
        status:'success',
        data: {
            user
        }
    })
}

async function getAllusersHandler(req, res, next) {
    console.log(req.user);
    
    console.log(req.query);
    
    const queryObject = getQueryObject();
    const features = new ApiFeatures(queryObject, req.query).fieldsFilter().paginate().sort();
    const users = await features.queryObject;

    res.status(200).json({
        status:'success',
        data: {
            users
        }
    })
}

async function updateUserHandler(req, res, next) {
    const { id } = req.user;
    const {name, steamId} = req.body;
    const updates = {name, steamId};
    const updatedUser = await updateUser(id, updates);
    if(!updatedUser) {
        // TODO: handle error
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }
    res.status(200).json({
        status:'success',
        data: {
            updatedUser
        }
    })
}
module.exports = {
    createUserHandler,
    getUserByIdHandler,
    loginUserHandler,
    getAllusersHandler,
    updateUserHandler
};