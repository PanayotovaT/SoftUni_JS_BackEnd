const mongoose = require('mongoose');

require('./Car');

const connectionString = 'mongodb://127.0.0.1:27017/test';

async function init() {

    try{
    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('Database connected');

    mongoose.connection.on('error', (err) => {
        console.log('Database error.');
        console.log(err);
    }) 
}catch(err) {
    console.error('Error connecting to database');
    process.exit(1);
}
}

module.exports = init;