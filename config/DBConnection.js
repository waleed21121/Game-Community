const mongoose = require('mongoose');

require('dotenv').config({path: '.env'});

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(() => {
    console.log('Connected to Games Community Database');
})

module.exports = mongoose;