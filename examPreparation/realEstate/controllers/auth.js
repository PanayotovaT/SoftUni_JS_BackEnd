const router = require('express').Router();
const { register, login } = require('../services/userService');

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', async (req, res) => {

    try {
        if (req.body.password == '') {
            throw new Error('Password is required!')
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!')
        }
        const user = await register(req.body.name, req.body.username, req.body.password);

        res.redirect('/');
    } catch (err) {
        console.log(err);
        
    }


});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password);
        res.redirect('/');
    } catch(err) {
        console.log(err)
    }
})


module.exports = router;