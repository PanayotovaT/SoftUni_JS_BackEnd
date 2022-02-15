const { validationResult } = require('express-validator');

module.exports = {
    registerGet(req, res) {
        res.render('register', { title: 'Register Page' })
    },
    async registerPost(req, res) {
        const { errors } = validationResult(req);

        try {
            if(errors.length > 0) {
                throw errors;
            } 
            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/');
        } catch (errors) {
            console.log(errors);
            res.render('register', { title: 'Register', errors, data: {username: req.body.username}} );
        }
    },
    loginGet(req, res) {
        res.render('login', { title: 'Login Page' })

    },
    async loginPost(req, res) {
        try {
            await req.auth.login(req.body.username, req.body.password);
            return res.redirect('/');

        } catch (err) {
            console.log(err.message);
            res.redirect('/login');
        }
    },

    logoutGet(req, res) {
        req.auth.logout();
        res.redirect('/');
    },
}