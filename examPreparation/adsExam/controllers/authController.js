const { Router } = require('express');
const { isUser, isGuest } = require('../middleware/guards');
const { register, login } = require('../services/userServices');
const mapErrors = require('../util/mappers');

const router = Router();

router.get('/register', isGuest(),(req, res) => {
    res.render('register', {title: 'Register Page'})
});

//TODO check form, action, method, field names
router.post('/register', isGuest(), async (req, res) => {
    try {
        if(req.body.password.trim() < 5){
            throw new Error('Password should be at least 5 characters.');
        }
        if (req.body.password.trim() != req.body.rePassword.trim()) {
            throw new Error('Passwords don\'t match!');
        }
        const user = await register(req.body.email, req.body.password, req.body.skill);
        req.session.user = user;
      
        res.redirect('/'); //TODO check redirect requirements
    } catch (err) {
        console.log(err);
        //TODO Send Error messages
        const errors = mapErrors(err);
        res.render('register', {data: {email: req.body.emial, skill: req.body.skill}, errors , title: 'Register Page'})
    }
})

router.get('/login', isGuest(), (req, res) => {
    res.render('login', {title: 'Login Page'});
});

//TODO check form action, method, field names
router.post('/login', isGuest(), async (req, res) => {

    try{
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/')
    } catch(err) {
        const errors = mapErrors(err);
        console.log(err);
        //TODO Send Error messages
        res.render('login', {data: {email: req.body.email}, errors, title: 'Login Page'})
    }
});

router.get('/logout', isUser(), (req, res) => {
    console.log(req.session.user)
    delete req.session.user;
    console.log(req.session.user)
    res.redirect('/');
    
})

module.exports = router;