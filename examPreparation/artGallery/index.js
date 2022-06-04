const express = require('express');
const  = require('./config/express');

start();
async function start() {

    const app = express();
    expressConfig(app);

    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    })

}
