const { Schema, model, Types: {ObjectId} } = require('mongoose');

const URL_REGEX = /^https?:\/\/(.+)/;

const estateSchema = new Schema({
    name: {type: String, minlength: [6, 'Name should be at least 6 characters']},
    type: {type: String, required: [true, 'Type is a required field'], enum: ['Apartment', 'Villa', 'House']},
    year: {type: Number, min: [1850, 'The year should be bewtween 1850 and 2021'], max: [2021, 'The year should be bewtween 1850 and 2021']},
    city: {type: String, minlength:[4, 'City should be at least 4 charcaters long']},
    homeImg: {type: String, validate: {
        validator(value) {
           return URL_REGEX.test(value);
        },
        message: 'Please insert a valid url!'
    }},
    description: {type: String, required: [true, 'Description is required field'], maxlength: [60, 'Description should be less than 60 characters.']},
    pieces: {type: Number, required: [true, 'Available Pieces is required field'], min: [0, 'Pieces field should be minimun 0'], max: [10, 'Pieces field should be maximum 10']},
    rented: {type: [ObjectId], ref: 'User', default: []},
    owner: {type: ObjectId, ref: 'User'},
});

// The Year should be between 1850 and 2021
// The City should be at least 4 characters long
// The Home Image should starts with http:// or https://.
// The Property Description should be a maximum of 60 characters long.
// The Available Pieces should be positive number (from 0 to 10)

const Estate = model('Estate', estateSchema);

module.exports = Estate;
