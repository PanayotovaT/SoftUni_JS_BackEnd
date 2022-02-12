const bcrypt = require('bcrypt');
const users = {
    'sofi': {
        username: 'sofi',
        hashedPassword: '$2b$10$z/bZMWthB9.EbMcp8eSfF.Pqhmvi1tKQUsZM6rQBrtw1knjx9r0BW'
    }
};

module.exports = () => {
    return (req, res, next) => {
        req.auth = {
            login,
            register
        }

        next();
        async function login(username, password) {
            const user = Object.values(users).find(u => u.username == username);
            if (user && await bcrypt.compare(password, user.hashedPassword)) {
                console.log('Sucecssfull Login');
                req.session.user = user;
                console.log(req.session.user);
                return true;
            } else {
                return false;
            }
        }

        async function register(username, password) {
            if (Object.values(users).find(u =>u.username == username) != undefined) {
                return false;
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                const id = 'xxxx-xxxx'.replace(/x/g, () => (Math.random()* 16 | 0).toString(16));
                const user = {
                    id,
                    username,
                    hashedPassword,
                }
                users[id] = user;
                console.log('Register successfull', 'Welcome, ', username);
                req.session.user = user;
                
                return true;
            }
        }
    }
}
