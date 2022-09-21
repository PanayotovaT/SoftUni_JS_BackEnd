const { hash, compare } = require('bcrypt');
const User = require('../models/User');

async function register(email, password, skill) {
    const existing = await getUserByEmail(email);
    if(existing) {
        throw new Error('Incorrect email or password!');
    }

    const hashedPassword = await hash(password, 10);

    const newUser = new User({
        email,
        hashedPassword,
        skill
    });
    await newUser.save();
    return newUser;
}

async function login(email, password) {
    const existingUser =  await getUserByEmail(email);

    if(!existingUser) {
        throw new Error('Incorrect email or password!')
    }

    const hasMatch = await compare(password, existingUser.hashedPassword);
    if(!hasMatch) {
        throw new Error('Incorrect email or password');
    }

    return existingUser;
}

async function getUserByEmail(email) {
    const user = await User.findOne({email: new RegExp(`^${email}$`, 'i')});
    return user;
}


module.exports  = {
    register,
    login
}