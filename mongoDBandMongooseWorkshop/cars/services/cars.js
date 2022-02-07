const { findById } = require('../models/Car');
const Car = require('../models/Car');

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

async function updateCar(id, car) {
    let existing = await Car.findById(id);
    existing.name = car.name;
    existing.description = car.description;
    existing.imageUrl = car.imageUrl;
    existing.price = car.price;
    await existing.save();

}

async function deleteCar(id) {
    await Car.findByIdAndDelete(id);

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