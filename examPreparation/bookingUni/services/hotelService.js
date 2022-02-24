const Hotel = require('../models/Hotel');

async function getAll() {
    return await Hotel.find({}).lean();
}

async function getOne(id) {
    return await Hotel.findById(id).populate('bookings', '_id email').lean();
}

async function create(hotel) {
    const result = new Hotel(hotel);
    await result.save();
}

async function update(id, hotel) {
    const existing = await Hotel.findById(id);

    existing.name = hotel.name;
    existing.city = hotel.city;
    existing.imgUrl = hotel.imgUrl;
    existing.freeRooms = hotel.freeRooms;

    await existing.save();

}

async function deleteHotel(id) {

    await Hotel.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteHotel
}