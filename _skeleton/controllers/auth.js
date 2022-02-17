const { Router } = require('express');
const { register, login } = require('../services/user');
const mapErrors = require('../util/mappers');

const router = Router();

router.get('/register', (req, res) => {
    res.render('register', {title: 'Register Page'})
});

//TODO check form, action, method, field names
router.post('/register', async (req, res) => {
    try {
        if (req.body.password != req.body.repeatPassword) {
            throw new Error('Passwords don\'t match!');
        }
        const user = await register(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/'); //TODO check redirect requirements
    } catch (err) {
        //TODO Send Error messages
        const errors = mapErrors(err);
        console.log(err);
        res.render('register', {data: {username: req.body.username}, errors , title: 'Register Page'})
    }
})

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login Page'});
});

//TODO check form action, method, field names
router.post('/login', async (req, res) => {

    try{
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/')
    } catch(err) {
        const errors = mapErrors(err);
        console.log(err);
        //TODO Send Error messages
        res.render('login', {data: {username: req.body.username}, errors, title: 'Login Page'})
    }
})

module.exports = router;