const User = require('../models/User');

testUpdate();
async function testUpdate(){
    const user  = await User.findOne({username: 'marry'});
    user.username = 'marryyyy';
    await user.save();
    console.log(user);
}

async function register(username, password) {
    const user  = new User({
        username, 
        hashedPassword: password
    });
    
    await user.save();
}
module.exports = () => (req, res, next ) => {
    req.auth = {
        register
    }
    next();
}