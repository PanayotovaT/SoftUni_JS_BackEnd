const router = require('express').Router();
const { register, login } = require('../services/userServices');
const { isUser, isGuest } =  require('../middlewares/guards');
const mapErrors = require('../util/mappers');


router
    .get('/register', isGuest(), (req, res) => {
        res.render('register', { title: 'Register Page' });
    })
    .post('/register', isGuest(), async (req, res) => {

        const email = req.body.email.trim();
        const password = req.body.password.trim();
        const repass = req.body.rePassword.trim();
        const skill = req.body.skill.trim();

        try {

            if (password.length < 5) {
                throw new Error('Password should be at least 5 characters.');
            }
            if (password != repass) {
                throw new Error('Passwords don\'t match!');
            }

            const newUser = await register(email, password, skill);
            req.session.user = newUser;
            res.redirect('/');
        } catch (err) {
            console.log(err);
            const errors = mapErrors(err);
            const data = { email, skill };
            res.render('register', { title: 'Register Page', errors, data })
        }
    })


router
    .get('/login', isGuest(), (req, res) => {

        res.render('login', { title: 'Login Page' });
    })
    .post('/login', isGuest(), async (req, res) => {
        const email = req.body.email.trim();
        const password = req.body.password.trim();

        try {
            const user = await login(email, password);
            req.session.user = user;
            res.redirect('/');

        } catch (err) {
            console.log(err)
            const errors = mapErrors(err);

            res.render('login', { title: 'LoginPage', errors, data: { email } })
        }
    });

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/');
})


module.exports = router;