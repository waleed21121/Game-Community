const {userGamesModel} = require('../models/index');
function getQueryObject() {
    return userGamesModel.find();
}

module.exports = {
    getQueryObject
}