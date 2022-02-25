const { Schema, model, Types: {ObjectId}} = require('mongoose');

// const URL_PATTERN = /^https?:\/\/(.+)/;

const tutorialSchema = new Schema({
    title: { type: String, required: [true, 'Title is required field']},
    description: { type: String, required: true, maxlength: [50, 'You may insert 50 characters maximum']},
    imageUrl: { type: String, required: true},
    duration: { type: String, required: true},
    create_at: { type: Date, required: true, default: Date.now },
    enrolledUsers: { type: [ObjectId], ref: 'User', default: []},
    owner: { type: ObjectId, ref: 'User', required: true},

});
tutorialSchema.index({title: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Tutorial =  model('Tutorial', tutorialSchema);

module.exports = Tutorial;
