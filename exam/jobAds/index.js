const express =  require('express');

start()
async function start() {
    const app = express();

    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    })
}