const { Schema, model } = require('mongoose');

const NAME_REGEX = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

const userSchema = new Schema({
    name:{ type: String, required: [true, 'Name is required'], validate: {
        validator(value) {
            return NAME_REGEX.test(value);
        },
        message: 'Name should be in the correct format.'
    }},
    username: {type: String, minlength: [5, 'Username should be at least 5 characters!']},
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