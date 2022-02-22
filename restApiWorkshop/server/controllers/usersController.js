const router = require('express').Router();
const { register, login, logout } = require('../services/userService');
const mapErrors = require('../util/mappers');
const {isAuth, isGuest } = require('../middlewares/guards');

router.post('/register', isGuest(), async (req, res) => {
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

router.post('/login', isGuest(), async (req, res) => {
    try {
        const result = await login(req.body.email.trim().toLowerCase(), req.body.password.trim());
        res.json(result);
    
    } catch (err) {
        const error = mapErrors(err).map(x => x.msg).join('\n');
        res.status(400).json({ message: error })
    }
});

router.get('/logout',  (req, res) => {
    logout(req.user?.token);
    res.status(204).end();
});


module.exports = router;
