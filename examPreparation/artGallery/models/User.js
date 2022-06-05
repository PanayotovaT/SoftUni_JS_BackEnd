const { Schema, model, Types: { ObjectId }} = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true},
    hashedPassword: { type: String, required: true},
    address: { type: String, required: [true, 'Address is required!']},
    publications: { type: [{ObjectId}], default: [], ref: 'Publication'},
});

userSchema.index({username: 1},{
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;

