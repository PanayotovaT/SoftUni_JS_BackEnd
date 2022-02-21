const express = require('express');
const mongoose = require('mongoose');
const catalogController = require('./controllers/catalogController');
const usersController =  require('./controllers/usersController');

const cors  = require('./middlewares/cors');

start();
async function start() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/furniture', {
            useUnifiedTopology: true,
            useNewUrlParser: true

        });
        console.log('Database ready');
    } catch (err) {
        console.error('Database connection failed');
        process.exit(1);
    }

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use('/data/catalog',catalogController);
    app.use('/users', usersController);
    app.get('/', (req, res) => res.json({message: 'REST service operational'}))
    app.listen(3030, () => console.log('Rest Service started on port 3030'))
    


}
