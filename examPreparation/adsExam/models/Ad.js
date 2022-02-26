const { Schema, model, Types: {ObjectId}} = require('mongoose');

// const URL_PATTERN = /^https?:\/\/(.+)/;

const adSchema = new Schema({
    headline: { type: String, minlength: [4, 'Headline should be at least 4 characters.']},
    location: { type: String, minlength: [8, 'Location should be at least 8 characters.']},
    company: { type: String, minlength: [3, 'Company should be at least 3 characters.']},
    description: { type: String, required: true, maxlength: [40, 'Description should be maximum 40 characters']},
    author: { type: ObjectId, ref: 'User', required: true },
    candidates: {type: [ObjectId], ref: 'User', default: []}
});


const Ad =  model('Ad', adSchema);

module.exports = Ad;
