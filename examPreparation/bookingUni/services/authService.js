const User = require('../models/User');
const {hash, compare} = require('bcrypt');

async function register (email, username, password) {
    const emailCheck = await findUserByEmail(email);
    const usernameCheck = await findUserByUsername(username);
    
    if(emailCheck || usernameCheck) {
        throw new Error('Username and email should be unique');
    }
    const hashedPassword = await hash(password, 10);
    
    const user = new User({
        email,
        username,
        hashedPassword
    });
    await user.save();
    return user;
}

async function login(username, password) {
    const user = await findUserByUsername(username);
    if(!user) {
        throw new Error('Username or password are incorrect!');
    }

    const hasMatch = await compare(password, user.hashedPassword);
    if(!hasMatch) {
        throw new Error('Username or password are incorrect!');

    }
    return user;
}

async function findUserByEmail(email) {
    return await User.findOne({email});
}

async function findUserByUsername(username) {
    return await User.findOne({username});
}

async function getUserById(id) {

    return User.findById(id).populate('bookedHotels', 'name').lean();
    
}
module.exports = {
    register,
    login,
    getUserById
}