const User = require('../models/User');
const { hash, compare } = require('bcrypt');

async function register(username, password, address) {
    const existingUser = await getUserByUsername(username);
    if(existingUser.username) {
        throw new Error('Incorrect username or password!')
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({
        username,
        hashedPassword,
        address
    });
    await user.save();
    return user;
}

async function login(username, password) {
    const existingUser =  getUserByUsername(username);
    if(!existingUser) {
        throw new Error('Incorrect username or password!');
    }

    const hasMatch = compare(password, existingUser.hashedPassword);

    if(!hasMatch) {
        throw new Error('Incorrect username or password!')
    }

    return existingUser;
}

async function getUserByUsername(username) {
    const user = await User.find({username: new RegExp(`^${username}$`, 'i')});
    return user;
}

module.exports = {
    login,
    register
}