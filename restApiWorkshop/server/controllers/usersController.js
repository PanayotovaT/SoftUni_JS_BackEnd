const router = require('express').Router();
const { register } = require('../services/userService');
const mapErrors = require('../util/mappers');

router.post('/register', async (req, res) => {
    try {
        if (req.body.password.trim() == '' || req.body.email.trim() == '') {
            throw new Error('Email and password are required!')
        }

        const result = await register(req.body.email.trim().toLowerCase(), req.body.password.trim());
        res.status(201).json(result);
    
    } catch (err) {
        const error = mapErrors(err).map(x => x.msg).join('\n');
        res.status(400).json({ message: error })
    }
});

router.post('/login', (req, res) => {
    console.log('Login');
    res.end();
});

router.get('/logout', (req, res) => {
    console.log('Logout');
    res.end();
});


module.exports = router;
