const {userModel} = require('../models/index');

function getQueryObject () {
    return userModel.find();
}
async function createUser(user) {
    const newUser = new userModel(user);
    await newUser.save();
    return newUser;
}

async function getUserByEmail (email) {
    const user = await userModel.findOne({email: email});
    return user;
}

async function getUserById (id) {
    const user = await userModel.findById(id);
    return user;
}

async function updateUser (id, updatedUser) {
    const user = await userModel.findByIdAndUpdate(id, updatedUser, {new: true});
    return user;
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    getQueryObject,
    updateUser
};