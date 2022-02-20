const { Schema, model, Types: {ObjectId}} = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const tripSchema = new Schema({
    start: { type: String, required: true, minlength: [4, 'Start point should be at least 4 characters']},
    end: { type: String, required: true, minlength: [4, 'End point should be at least 4 characters']},
    date: { type: String, required: true},
    time: { type: String, required: true},
    carImg: { type: String, required: true, validate: {
        validator(value) {
            return URL_PATTERN.test(value);
        },
        message: 'Car image should have a valid Url!'
    }},
    carBrand: { type: String, required: true, minlength: [4, 'Car brand point should be at least 4 characters']},
    seats: { type: Number, required: true, min: [0, 'Seats can be between  0 and 4'], max: [4, 'Seats can be between  0 and 4']},
    price: { type: Number, required: true, min: [1, 'Price must be between 1 and 50!'], max: [50, 'Price must be between 1 and 50!']},
    description: { type: String, required: true,  minlength: [10, 'End point should be at least 10 characters']},
    owner: { type: ObjectId, ref: 'User', required: true},
    buddies: { type: [ObjectId], ref: 'User', default: []},

});


const Trip =  model('Trip', tripSchema);

module.exports = Trip;
