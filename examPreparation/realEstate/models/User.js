const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name:{ type: String, required: [true, 'Name is required']},
    username: {type: String,  required: [true, 'Name is required']},
    hashedPassword: {type: String,  required: [true, 'Password is required']}
});

userSchema.index({username: 1}, {
    unique: true,
    collation: {
        locale:'en',
        strength: 1
    }
})

const User  = model('User', userSchema);

module.exports = User;