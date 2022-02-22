const mongoose = require('mongoose');

const connectionString = `mongodb://127.0.0.1:27017/realestate`;

module.exports = async (app) => {
    try {
       await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database connected');

        mongoose.connection.on('error', (error) => {
            console.log('Database error');
            console.log(error);
        })
    } catch(err) {
        console.log('Error connecting to Database');
        process.exit(1);
    }
}
