const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://xela:123@cluster0.keitx.mongodb.net/?retryWrites=true&w=majority'

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