const { Schema, model, Types: {ObjectId}} = require('mongoose');

const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema =  new Schema({
    email: {type: String, required: [true, 'You must insert a username'], validate: {
        validator(value) {
            return EMAIL_PATTERN.test(value);
        },
        message: 'Insert a valid email'
    }},
    hashedPassword: { type: String, required: true},
    skill: {type: String, required: [true, 'Skill is required field'], maxLength: [40, 'Skill can have maximum 40 characters']},
    myAds: {type: [ObjectId], ref: 'Ad', default: []}
    
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