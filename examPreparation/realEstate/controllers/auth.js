const router = require('express').Router();
const { register, login } = require('../services/userService');
const mapErrors = require('../util/mappers');
const { isUser, isGuest } = require('../middleware/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', isGuest(), async (req, res) => {

    try {
        if (req.body.password.trim().length < 4) {
            throw new Error('Password should be at least 4 characters')
        }
        if (req.body.password.trim() != req.body.repass) {
            throw new Error('Passwords don\'t match!')
        }
        const user = await register(req.body.name.trim(), req.body.username.trim().toLowerCase(), req.body.password.trim());
        console.log(user);
        req.session.user = user;
        console.log(res.locals);

        res.redirect('/');
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('register', { title: 'Register Page', data: {name: req.body.name, username: req.body.username }, errors})
        
    }


});

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.username.trim().toLowerCase(), req.body.password.trim());
        req.session.user =  user;
        console.log(req.session.user);
        res.redirect('/');
    } catch(err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('login', {title: 'Login Page', data: {username: req.body.username}, errors})
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/');
})


module.exports = router;