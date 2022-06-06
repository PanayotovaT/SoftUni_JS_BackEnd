const { Schema, model, Types: { ObjectId }} = require('mongoose');

const publicationSchema = new Schema({
    title: {type: String, required: [true, 'Title is a required field!']},
    technique: {type: String, required: [true, 'Technique is a required field!']},
    imageUrl: {type: String, required: [true, 'ImageUrl is a required field!']},
    certificate: {type: String, required: [true, 'Certificate is a required field!'], enum: ['Yes', 'No']},
    author: {type: ObjectId, required: true, ref: 'User'},
    sharedBy:{type: [ObjectId], default: [], ref: 'User'}
});

const Publications = model('Publication', publicationSchema);
 
module.exports = Publications;