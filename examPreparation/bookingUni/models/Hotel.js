const { Schema, model, Types: { ObjectId}} = require('mongoose');

const hotelSchema = new Schema({
    name:{type: String, required: true},
    city: {type: String, required: true},
    imgUrl: {type: String, required: true},
    freeRooms: {type: Number, 
        min: [1, 'Number should be between 1 and 100'], 
        max: [100, 'Number should be between 1 and 100']},
    bookings: {type: [ObjectId], ref: 'User', default: []},
    owner:{type: String, required: [true, 'Owner is a required field']}
})

// Name - string (required), unique
// City - string (required),
// Image Url - string (required),
// Free Rooms – number (required), must be between 1 and 100,
// Users Booked a room - a collection of Users
// Owner – string (required)

const Hotel = model('Hotel', hotelSchema);

module.exports = Hotel;