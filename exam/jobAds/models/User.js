const { Schema, model, Types: {ObjectId} } = require('mongoose');

const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema =  new Schema({
    email: { type: String, required: [true, 'Email is a required field!'], validate: {
        validator(value) {
            return EMAIL_PATTERN.test(value);
        },
        message: 'A valid email is required!'
    }},
    hashedPassword: {type: String, required: true},
    skill: {type: String, required: [true, 'Skill is required field'], maxLength: [40, 'Skills can be maximum 40 characters long!']},
    myAds: {type: [ObjectId], ref: 'Ad', default: [] }
});

userSchema.index({email: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User', userSchema);

module.exports = User;