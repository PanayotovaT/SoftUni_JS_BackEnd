const { Router } = require('express');
const { isUser, isGuest } = require('../middleware/guards');
const { register, login } = require('../services/user');
const {mapErrors} = require('../util/mappers');

const router = Router();

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' })
});

//TODO check form, action, method, field names
router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '') {
            throw new Error('You must insert a password');
        }
        if (req.body.password.trim() != req.body.repeatPassword.trim()) {
            throw new Error('Passwords don\'t match!');
        }
        const user = await register(
            req.body.firstName.trim(),
            req.body.lastName.trim(),
            req.body.email.trim(),
            req.body.password.trim()
        );
        req.session.user = user;
        res.redirect('/'); //TODO check redirect requirements
    } catch (err) {
        //TODO Send Error messages
        const errors = mapErrors(err);
        console.log(err);

        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
        res.render('register', { data, errors, title: 'Register Page' })
    }
})

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login Page' });
});

//TODO check form action, method, field names
router.post('/login', isGuest(), async (req, res) => {

    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/')
    } catch (err) {
        const errors = mapErrors(err);
        console.log(err);
        //TODO Send Error messages
        res.render('login', { data: { email: req.body.email }, errors, title: 'Login Page' })
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/');
})

module.exports = router;