const req = require('express/lib/request');
const { model, Schema, Types: { ObjectId} } = require('mongoose');

const itemSchema = new Schema({
    make: { type: String, required: [true, 'Make is a required field'] },
    model: { type: String, min: [4, 'Model should be at least 4 characters'] },
    year: { type: Number, required: [true, 'Year is a required field'], min: [1950, 'Year must be greater than 1950'], max: [2050, 'Year must be less than 2050'] },
    description: { type: String, minlength: [10, 'Description should be at least 10 characters'] },
    price: { type: Number, required: [true, 'Price is a required field'] , min: [1, 'Price should be a positive number']},
    img: { type: String, required: [true, 'Image is a required field'] },
    material: { type: String },
    owner: {type: ObjectId, ref: 'User'}
});

const Item  = model('Item', itemSchema);

module.exports = Item;