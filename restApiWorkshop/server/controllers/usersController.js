const router = require('express').Router();

router.post('/register', (req, res) => {
    console.log('Register');
    res.end();
});

router.post('/login', (req, res) => {
    console.log('Login');
    res.end();
});

router.get('/logout', (req, res) => {
    console.log('Logout');
    res.end();
});


module.exports = router;
