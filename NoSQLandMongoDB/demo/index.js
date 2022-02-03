const { MongoClient } = require('mongodb');

const connectionString = 'mongodb://127.0.0.1:27017';

start();

async function start() {
    const connection = new MongoClient(connectionString, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
    
    await connection.connect();
 
    console.log('Database connected');
    const db = connection.db('test');
    const data =  await db.collection('cars').find({}).toArray();
    console.log(data);
}
