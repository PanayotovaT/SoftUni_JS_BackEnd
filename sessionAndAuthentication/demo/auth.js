const bcrypt = require('bcrypt');
const users = {
    'sofi': {
        username: 'sofi',
        password: '123'
    }
};

module.exports = () => {
    return (req, res, next) => {
        req.auth = {
            login,
            register
        }

        next();
        function login(username, password) {
            const user = users[username];
            if (user && password == user.password) {
                console.log('Sucecssfull Login');
                req.session.user = user;
                return true;
            } else {
                return false;
            }
        }

        function register(username, password) {
            if (users[username] != undefined) {
                return false;
            } else {

                const user = {
                    username: username,
                    password: password,
                }
                users[username] = user;
                console.log('Register successfull', 'Welcome, ', username);
                return true;
            }
        }
    }
}
