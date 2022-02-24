const { Schema, model, Types: { ObjectId}} = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const hotelSchema = new Schema({
    name:{type: String, minlength:[4, 'Name should be at least 4 characters']},
    city: {type: String, minlength:[3, 'City should be at least 3 characters']},
    imgUrl: {type: String, validate: {
        validator(value) {
            return URL_PATTERN.test(value)
        },
        message: 'Please insert a valid url!'
    }},
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