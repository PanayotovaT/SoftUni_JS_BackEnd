const mongoose = require('mongoose');
require('../models/User');
require('../models/Tutorial');


const connectionString = 'mongodb://127.0.0.1:27017/tutorials';

module.exports = async (app) => {

    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected!');

        mongoose.connection.on('error', (error) => {
            console.log('Database error');
            console.log(error);
        })
    } catch (error) {
        console.error('Error connecting to database');
        process.exit(1);
    }
}