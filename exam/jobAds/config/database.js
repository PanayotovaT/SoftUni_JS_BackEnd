const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/ads';

module.exports  = async (app) => {
    try {
        await mongoose.connect(connectionString,  {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');

        mongoose.connection.on('error', (error) => {
            console.log('Database Error');
            console.log(error);
        })

    } catch(err) {
        console.error('Error connecting to the database');
        process.exit(1);
    }
}