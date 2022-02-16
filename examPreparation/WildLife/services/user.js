const User = require('../models/User');
const { hash, compare} = require('bcrypt');

//TODO add all fields required by the exam
async function register(username, password) {
    const existing = await getUserByUsername(username);
    if(existing) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await hash(password, 10);
    const user =  new User({
        username,
        hashedPassword
    });

    await user.save();
}
//TODO identify user by given identifier
async function getUserByUsername(username) {
    const user = User.find({username});

    return user;
}