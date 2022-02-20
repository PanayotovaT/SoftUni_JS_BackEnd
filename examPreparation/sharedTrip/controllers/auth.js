const { Router } = require('express');
const { isUser, isGuest } = require('../middleware/guards');
const { register, login } = require('../services/user');
const mapErrors = require('../util/mappers');

const router = Router();

router.get('/register', isGuest(),(req, res) => {
    res.render('register', {title: 'Register Page'})
});

//TODO check form, action, method, field names
router.post('/register', isGuest(), async (req, res) => {
    try {
        if(req.body.password.trim().length < 4){
            throw new Error('Password must be at least 4 characters');
        }
        if (req.body.password.trim() != req.body.rePassword.trim()) {
            throw new Error('Passwords don\'t match!');
        }
        const user = await register(req.body.email, req.body.password, req.body.gender);
        req.session.user = user;
      
        res.redirect('/'); //TODO check redirect requirements
    } catch (err) {
        console.log(err);
        //TODO Send Error messages
        const errors = mapErrors(err);
        const isMale = req.body.gender == 'male';
        res.render('register', {data: {email: req.body.email, isMale }, errors , title: 'Register Page'})
    }
})

router.get('/login', isGuest(), (req, res) => {
    res.render('login', {title: 'Login Page'});
});

//TODO check form action, method, field names
router.post('/login', isGuest(), async (req, res) => {

    try{
        const user = await login(req.body.email, req.body.password);
        console.log(user)
        req.session.user = user;
        console.log(req.session)
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