const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');

start();
async function start() {

    const app = express();
    expressConfig(app);
    await databaseConfig(app);

    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    })

}

