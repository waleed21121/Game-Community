const mongoose = require('mongoose');

require('dotenv').config({path: '.env'});

mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('Connected to Games Community Database');
})

module.exports = mongoose;