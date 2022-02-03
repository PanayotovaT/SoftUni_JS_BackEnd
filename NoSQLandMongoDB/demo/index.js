// const { MongoClient } = require('mongodb');

// const connectionString = 'mongodb://127.0.0.1:27017';

// start();

// async function start() {
//     const connection = new MongoClient(connectionString, {
//         useNewUrlParser: true, 
//         useUnifiedTopology: true
//     });

//     await connection.connect();

//     console.log('Database connected');
//     const db = connection.db('test');
//     const data =  await db.collection('cars').find({}).toArray();
//     console.log(data);
// }

//---------------------------


const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/test';


const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, default: 1000 }
});

carSchema.methods.startEngine = function(){
    console.log(`${this.name} goes Vroom!`);
}

carSchema.virtual('VAT').get(function(){
    return this.price * 0.2;
});

const Car = mongoose.model('Car', carSchema);


start();

async function start() {
    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('Database connected!');



    // const car = new Car({
    //     name: 'Ford',
    //     // price: 25000
    // });
    // await car.save();

    const data = await Car.find({});
    console.log(data);
    data.forEach(x => x.startEngine());
    data.forEach(x => console.log(x.VAT));
}