const User = require('../models/User');
const { hash, compare} = require('bcrypt');

//TODO add all fields required by the exam
async function register(username, password) {
    console.log(username, password);
    const existing = await getUserByUsername(username);
    console.log(existing)
    if(existing) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await hash(password, 10);
    console.log(hashedPassword);
    const user =  new User({
        username,
        hashedPassword
    });

    await user.save();
    return user;
}

//TODO change identifier
async function login(username, password) {
    const user = await getUserByUsername(username);

    if(!user) {
        throw new Error('User does\'nt exist ')
    }
    const hasMatch = await compare(password, user.hashedPassword);
    if(!hasMatch) {
        throw new Error('Incorrect username or password');
    }

    return user;
}

//TODO identify user by given identifier
async function getUserByUsername(username) {
    const user =await User.findOne({ username })
    console.log(user);
    return user;
}

module.exports = {
    login,
    register
}