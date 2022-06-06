const { Router } = require('express');
const { register } = require('../services/authService');
const { login } = require('../services/authService');
const router = Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
})

router.post('/register', async (req, res) => {

    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const repass = req.body.repass.trim();
    const address = req.body.address.trim();

    try {

        if (username.length < 4) {
            throw new Error('Username should be at least 4 characters');
        }

        if (password.length < 3) {
            throw new Error('Password should be at least 3 characters');
        }

        if (password !== repass) {
            throw new Error('Passwords don\'t match!');
        }

        if (address == '') {
            throw new Error('Please insert address!');
        }

        const user = await register(username, password, address);
        req.session.user = user;
        res.redirect('/');

    } catch (err) {
        console.error(err);
        res.render('register', { title: 'Register Page', data: { username, address } })
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    try {
        const user  = await login(username, password);
        req.session.user = user;
        res.redirect('/')

    } catch (err) {
        console.log(err);
        res.redirect('/login');
    }
})

router.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/login');
})  

module.exports = router;