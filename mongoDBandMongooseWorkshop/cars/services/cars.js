const fs = require('fs/promises');
const Car = require('../models/Car');

const filePath = './services/data.json';

async function read() {
    try {
        const file = await fs.readFile(filePath);
        return JSON.parse(file);
    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1);
        // This kills the app
    }
}

async function write(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Database write error');
        console.error(err);
        process.exit(1);
    }
}

function carViewModel(car) {
    return {
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
        id: car._id
    }
}
async function getAll(query) {
    const options = {};

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }
    if (query.from) {
        options.price = { $gte: Number(query.from) }
    }
    if (query.to) {
        if (!options.price) {
            options.price = {}
        }
        options.price.$lte = Number(query.to);
    }
    console.log(options);

    const cars = await Car.find(options);
    return cars.map(carViewModel);

}

async function getOne(id) {
    const car = await Car.findById(id);
    if (car) {
        return carViewModel(car)
    } else {
        return undefined;
    }
}

async function createCar(car) {

    const result = new Car(car);
    await result.save();

}

async function updateCar(id, updatedCar) {
    const data = await read();

    if (data.hasOwnProperty(id)) {
        data[id] = updatedCar;
        await write(data);
    } else {
        throw new ReferenceError('No such id in the database!');
    }
}

async function deleteCar(id) {
    const data = await read();

    if (data.hasOwnProperty(id)) {
        delete data[id];
        await write(data);
    } else {
        throw new ReferenceError('No such id in the database!');
    }
}


function nextId() {
    return 'xxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getOne,
        createCar,
        deleteCar,
        updateCar
    };
    next();
}