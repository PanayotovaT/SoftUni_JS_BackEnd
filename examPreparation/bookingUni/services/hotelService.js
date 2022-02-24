const Hotel = require('../models/Hotel');
const User = require('../models/User');

async function getAll() {
    return await Hotel.find({}).lean();
}

async function getOne(id) {
    return await Hotel.findById(id).populate('bookings', '_id email').lean();
}

async function create(hotel) {
    const result = new Hotel(hotel);
    await result.save();
    const user = await User.findOne({_id: result.owner});
    user.offeredHotels.push(result._id);
    await user.save();
}

async function update(id, hotel) {
    const existing = await Hotel.findById(id);

    existing.name = hotel.name;
    existing.city = hotel.city;
    existing.imgUrl = hotel.imgUrl;
    existing.freeRooms = hotel.freeRooms;

    await existing.save();

}

async function deleteHotel(id, owner) {

    await Hotel.findByIdAndDelete(id);
    const user = await User.findById(owner);
    user.offeredHotels = user.offeredHotels.filter(x => x != id);
    await user.save();
}

async function bookHotel(hotelId, userId) {
    const hotel = await Hotel.findById(hotelId);
    if(hotel.bookings.includes(userId)) {
        throw new Error('You cannot book a hotel twice!')
    }
    hotel.bookings.push(userId);
    await hotel.save();
    const user = await User.findById(userId);
    user.bookedHotels.push(hotelId);
    await user.save();
}

async function hasBooked(hotelId, userId) {

return (await Hotel.findById(hotelId)).bookings.includes(userId);
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteHotel,
    bookHotel,
    hasBooked
}