const {Schema, model, Types: { ObjectId }} = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: [true, 'Car name is required.'], minlength: [3, 'Car name must be at least 3 characters']},
    description: { type: String, default: ''},
    imageUrl: { type: String, default: 'noImage.jpg' },
    price: { type: Number, required: true, min: 0},
    accessories: { type: [ObjectId], defaut: [], ref: 'Accessory'},
    isDeleted: {type: Boolean, default: false},
    owner: {type: ObjectId, ref: 'User'}
});


const Car = model('Car', carSchema);

module.exports  = Car;