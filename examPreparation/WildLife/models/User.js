const { Schema, model} = require('mongoose');

//TODO change user model according to exam description
//TODO add validation
const NAME_PATTERN = /^[a-zA-Z]+$/;
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema =  new Schema({
    firstName: {type: String,  minlength: [3, 'First name must be at least 3 characters.'], validate: {
        validator(value) {
            return NAME_PATTERN.test(value)
        },
        message:'First name may contain only english letters!'
    }},
    lastName: {type: String, minlength: [5, 'Last name must be at least 5 characters.'], validate: {
        validator(value) {
            return NAME_PATTERN.test(value)
        },
        message:'Last name may contain only english letters!'
    }},
    email: {type: String, required: [true, 'Please insert an email'], validate: {
        validator(value) {
            return EMAIL_PATTERN.test(value);
        },
        message: 'You must insert a valid email'
    }},
    hashedPassword: { type: String, required: true}
});

userSchema.index({email: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;