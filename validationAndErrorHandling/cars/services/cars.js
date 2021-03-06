const res = require('express/lib/response');
const Car = require('../models/Car');
const { carViewModel } = require('./util');


async function getAll(query) {
    const options = {
        isDeleted: false,
    };

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
   

    const cars = await Car.find(options);
    return cars.map(carViewModel);

}

async function getOne(id) {
    const car = await Car.findById(id).where({isDeleted: false}).populate('accessories');
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

async function updateCar(id, car, ownerId) {
    let existing = await Car.findById(id).where({isDeleted: false});
    
    if(existing.owner != ownerId) {
        return false;
    }
    
    existing.name = car.name;
    existing.description = car.description;
    existing.imageUrl = car.imageUrl || undefined;
    existing.price = car.price;
    existing.accessories = car.accessories;
    await existing.save();
    return true;

}

async function attachAccessory(carId, accessoryId, ownerId) {
    let existing = await Car.findById(carId);

    if (existing.owner != ownerId) {
        console.log('User is not owner!');
        return false;
    }
    existing.accessories.push(accessoryId);
    await existing.save();
    return true;


}

async function deleteCar(id, ownerId) {
    const existing = await Car.findById(id).where({isDeleted: false})
    if(existing.ownerId != ownerId) {
        return false;
    } 
    // await Car.findByIdAndDelete(id);
    await Car.findByIdAndUpdate(id, {isDeleted: true });
    return true;
}


module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getOne,
        createCar,
        deleteCar,
        updateCar,
        attachAccessory
    };
    next();
}