const { Schema, model, Types:  { ObjectId } } = require('mongoose');

const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema =new Schema({
    email: {type: String, required: true, validate: {
        validator(value) {
            return EMAIL_PATTERN.test(value);
        },
        message: 'Please insert a valid email'
    } },
    username: {type: String, required: true },
    hashedPassword:  {type: String, required: true },
    bookedHotels: {type: [ObjectId], ref: 'Hotel', default: []},
    offeredHotels: {type: [ObjectId], ref: 'Hotel', default: []}

})

userSchema.index({email: 1, username: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
    
})
const User = model('User', userSchema);

module.exports = User;

