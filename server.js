const app = require('./app');
require('dotenv').config({path: '.env'});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});