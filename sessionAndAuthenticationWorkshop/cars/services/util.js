const bcrypt  = require('bcrypt');

function accessoryViewModel(accessory) {
    return {
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
        price: accessory.price,
        id: accessory._id,
    };
}

function carViewModel(car) {
    const model = {
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
        id: car._id,
        accessories: car.accessories
    }
    if(model.accessories.length > 0 && model.accessories[0].name) {
        model.accessories = model.accessories.map(accessoryViewModel);
    }
    return model;
}

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}   

async function comparePassword(password, hashedPassword){
    return bcrypt.compare(password, hashedPassword);
}


module.exports = {
    accessoryViewModel,
    carViewModel,
    hashPassword,
    comparePassword
}