const mongoose = require('mongoose');

require('../models/User');
require('../models/Publication');

const databaseString = 'mongodb://127.0.0.1:27017/gallery';

module.exports = async (app) => {

    try{
        await mongoose.connect(databaseString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database connected');

        mongoose.connection.on('error' ,(error) => {
            console.log('Database error');
            console.log(error);
        })

    } catch(err) {
        console.error('Error connecting to database!');
        process.exit(1);
    }


}