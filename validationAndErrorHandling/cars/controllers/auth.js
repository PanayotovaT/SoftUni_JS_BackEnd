const { validationResult } = require('express-validator');

module.exports = {
    registerGet(req, res) {
        res.render('register', { title: 'Register Page' })
    },
    async registerPost(req, res) {
        const { errors } = validationResult(req);
        // console.log(errors);

        /*
        if (req.body.username.trim() == '' || req.body.password.trim() == '') {
            return res.redirect('/register');
        }

        if (req.body.password != req.body.repeatPassword) {
            return res.redirect('/register');
        }

        */
        try {
            if(errors.length > 0) {
                throw errors;
            } 
            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/');
        } catch (err) {
            // console.log(err.message);
            console.log(err);
            res.redirect('/register');
        }
    },
    loginGet(req, res) {
        res.render('login', { title: 'Login Page' })

    },
    async loginPost(req, res) {
        console.log(req.body);
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