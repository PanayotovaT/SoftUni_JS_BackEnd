const { model, Schema } = require('mongoose');

const itemSchema = new Schema({
    make: { type: String, required: [true, 'Make is a required fiels'] },
    model: { type: String, required: [true, 'Modle is a required fiels'] },
    year: { type: Number, required: [true, 'Year is a required fiels'] },
    description: { type: String, required: [true, 'Description is a required fiels'] },
    price: { type: Number, required: [true, 'Price is a required fiels'] },
    img: { type: String, required: [true, 'Image is a required fiels'] },
    material: { type: String }

});

const Item  = model('Item', itemSchema);

module.exports = Item;