const mapErrors = require('../util/mappers');
const { register, login } = require('../services/authService');
const { isGuest, isUser } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', isGuest(), async (req, res) => {

    const email = req.body.email.trim().toLowerCase();
    const username = req.body.username.trim().toLowerCase();
    const password = req.body.password.trim();
    const rePassword = req.body.rePassword.trim();
    try {
        if (password == '') {
            throw new Error('Password is required!')
        }
        if (password != rePassword) {
            throw new Error('Passwords don\'t match!')
        }
        const user = await register(email, username, password);
        req.session.user = user;
        res.redirect('/');

    } catch (err) {
        console.log(err)
        const errors = mapErrors(err);
        res.render('register', { title: 'Register Page', errors, data: { email, username } })
    }
})

router.get('/login', isGuest(),(req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', isGuest(), async (req, res) => {
    const username = req.body.username.trim().toLowerCase();
    const password = req.body.password.trim();
    try {
        const user = await login(username, password);
        req.session.user = user;
        res.redirect('/')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('login', { title: 'Login Page', errors, data: { username } })
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/')
});


module.exports = router;
