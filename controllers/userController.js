const bcrypt = require('bcrypt');

const {createUser, getUserByEmail, getUserById, getQueryObject, updateUser} = require('../services/userService');
const ApiFeatures = require('../utils/apiFeatures');

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
    
    // TODO: generate token

    await createUser(newUser)
    res.status(201).json({
        status: 'success',
        data: {
            newUser,
            token: null
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
    // TODO: generate token

    res.status(200).send({
        status:'success',
        data: {
            user,
            token: null
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
    const { id } = req.params;
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