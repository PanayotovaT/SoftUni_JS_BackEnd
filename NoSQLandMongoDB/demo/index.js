const { MongoClient} = require('mongodb');

const connectionString = 'mongodb://localhost:27017';
const connection = new MongoClient(connectionString, {
    useUnifiedTopology: true
});

connection.connect((err, result) => {
    if(err !== null) {
        console.log('Database connection error!');
        process.exit(1);
    }
    console.log('Database connected');
});

