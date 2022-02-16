const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { mapError } = require('../services/util');
const router = Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' })
});

router.post('/register', 
body('username')
    .trim()
    .isLength({min: 5}).withMessage('Username should contain 5 characters')
    .isAlphanumeric().withMessage('Only letters and numbers are allowed!'),
body('password')
    .trim()
    .isLength({min: 8}).withMessage('Password should contain 8 characters.')
    .isAlphanumeric().withMessage('Only letters and numbers are allowed!'),
body('repeatPassword')
    .trim()
    .custom((value, { req }) => {
        return value == req.body.password
    }).withMessage('Passwords don\'t match!'),
async (req, res) => {
    const { errors } = validationResult(req);
    try {
        if (errors.length > 0) {
            throw errors;
        }
        await req.auth.register(req.body.username, req.body.password);
        res.redirect('/');
    } catch (errors) {
        res.locals.errors = mapError(errors);
        res.render('register', { title: 'Register', data: { username: req.body.username } });
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' })

});

router.post('/login', async (req, res) => {
    try {
        await req.auth.login(req.body.username, req.body.password);
        return res.redirect('/');

    } catch (err) {
        console.log(err.message);
        res.locals.errors = [{msg: err.message}]
        res.render('login', { title: 'Login Page', data: {username: req.body.username}});
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
})
module.exports = router;