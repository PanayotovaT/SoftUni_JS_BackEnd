const User = require('../models/User');
const { hash, compare} = require('bcrypt');

//TODO add all fields required by the exam
async function register(email, password, gender) {
    const existing = await getUserByEmail(email);
    if(existing) {
        throw new Error('Incorrect username or password!');
    }

    const hashedPassword = await hash(password, 10);
    const user =  new User({
        email,
        hashedPassword,
        gender
    });

    await user.save();
    return user;
}

//TODO change identifier
async function login(email, password) {
    const user = await getUserByEmail(email);

    if(!user) {
        throw new Error('Incorrect username or password')
    }
    const hasMatch = await compare(password, user.hashedPassword);
    if(!hasMatch) {
        throw new Error('Incorrect username or password');
    }

    return user;
}

//TODO identify user by given identifier
async function getUserByEmail(email) {
    const user =await User.findOne({ email: new RegExp(`^${email}$`, 'i') })
    return user;
}

module.exports = {
    login,
    register
}