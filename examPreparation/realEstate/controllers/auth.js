const router = require('express').Router();
const { register, login } = require('../services/userService');
const mapErrors = require('../util/mappers');

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', async (req, res) => {

    try {
        if (req.body.password.trim() == '') {
            throw new Error('Password is required!')
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

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', async (req, res) => {
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

router.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
})


module.exports = router;