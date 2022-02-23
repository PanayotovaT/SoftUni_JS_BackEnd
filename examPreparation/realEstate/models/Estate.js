const { Schema, model, Types: {ObjectId} } = require('mongoose');

const estateSchema = new Schema({
    name: {type: String, required: [true, 'Name is required field']},
    type: {type: String, required: [true, 'Type is a required field'], enum: ['Apartment', 'Villa', 'House']},
    year: {type: Number, required: [true, 'Year is required field']},
    city: {type: String, required: [true, 'City is required field']},
    homeImg: {type: String, required: [true, 'Home Image is required field']},
    description: {type: String, required: [true, 'Description is required field']},
    pieces: {type: Number, required: [true, 'Available Pieces is required field']},
    rented: {type: [ObjectId], ref: 'User', default: []},
    owner: {type: ObjectId, ref: 'User'},
});

const Estate = model('Estate', estateSchema);

module.exports = Estate;
