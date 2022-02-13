const User = require('../models/User');
const { comparePassword } = require('./util');

/*
testUpdate();
async function testUpdate(){
    const user  = await User.findOne({username: 'marry'});
    user.username = 'marryyyy';
    await user.save();
    console.log(user);
}
*/

async function register(username, password) {
    const user = new User({
        username,
        hashedPassword: password
    });

    await user.save();
}

async function login(username, password) {
    const user = await User.findOne({ username });

    if (user && await user.comparePassword(password)) {
        return true;
    }
    throw new Error('Incorrect username or password!');
}

module.exports = () => (req, res, next) => {
    req.auth = {
        register,
        login
    }
    next();
}