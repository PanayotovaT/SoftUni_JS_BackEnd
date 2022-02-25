const { Schema, model, Types: {ObjectId}} = require('mongoose');

const userSchema =  new Schema({
    username: {type: String, required: [true, 'You must insert a username']},
    hashedPassword: { type: String, required: true},
    enrolledCourses: {type: [ObjectId], ref: 'Tutorial', default: []}
});

userSchema.index({username: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;