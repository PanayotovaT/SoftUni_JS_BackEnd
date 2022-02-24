const mongoose = require('mongoose');
const User = require('../models/User');
const Hotel = require('../models/Hotel');

const connectionString = 'mongodb://127.0.0.1:27017/bookingUni';

module.exports = async (app) => {

    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected!')

        mongoose.connection.on('error', (error) => {
            console.error('Database connection error');
            console.log(error);
        })

    } catch (err) {
        console.log('Error connecting to database');
        process.exit(1);
    }
}