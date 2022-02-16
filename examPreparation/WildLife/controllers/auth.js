const { Router } = require('express');
const { register, login } = require('../services/user');

const router = Router();

router.get('/register', (req, res) => {
    res.render('register', { layout: false })
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
        console.log(err);
        res.render('register', { layout: false, data: {username: req.body.username} })
    }
})

router.get('/login', (req, res) => {
    res.render('login', { layout: false });
});

//TODO check form action, method, field names
router.post('/login', async (req, res) => {

    try{
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/')
    } catch(err) {
        console.log(err)
        res.render('login', {data: {username: req.body.username}})
    }
})

module.exports = router;