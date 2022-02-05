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

// const Car = require('./models/Car');
require('./models/Car');
const Car = mongoose.model('Car');
//these are equals;


const connectionString = 'mongodb://127.0.0.1:27017/test';



start();

async function start() {
    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('Database connected!');


    // try {

    //     const car = new Car({
    //         price: 30000
    //     });
    //     await car.save();
    // } catch (err) {
    //     // console.log(err.message);
    //     // console.log(err._message);
    //     // console.log(err.errors);
    // }
    // const data = await Car.find({});
    // data.forEach(x => x.startEngine());
    // data.forEach(x => console.log(x.VAT));
    // const car =  await Car.findOne({name: 'Mitsubishi'});
    // const car =  await Car.findById('61fba7d3db85e93c6f5d223a');
    // console.log(car);
    // car.price = 21000;
    // await car.save();

    // const data =  await Car.find({price: {$gte: 30000 , $lte: 50000}});
    // console.log(data);

    // await Car.findByIdAndUpdate('61fba7d3db85e93c6f5d223a', {price: 34000})

    // console.log(await Car.countDocuments({price:{$gte: 30000}}))

    // console.log((await Car.find({}).select('name price')));
    console.log(await Car.find({}).select('price').sort({price: -1}));

    console.log(await Car.find({}).skip(10).limit(10));
    //This is pagination

    console.log(await Car.find({}).where('price').gt(30000).lt(40000));
}