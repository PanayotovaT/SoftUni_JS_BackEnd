const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

require('../models/Ad');
require('../models/User');

const connectionString = 'mongodb+srv://xela:123@database.ftbm5qz.mongodb.net/?retryWrites=true&w=majority/Database';

module.exports  = async (app) => {
    try {
        await mongoose.connect(connectionString,  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1
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