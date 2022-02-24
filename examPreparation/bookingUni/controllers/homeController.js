const router =  require('express').Router();

router.get('/', (req, res) => {
    res.render('home', {title: 'Home Page', hotels: []});
});

router.get('/details/:id', (req, res) => {
    res.render('details', {title: 'Details Page'});
});

router.get('/profile', (req, res) => {
    res.render('profile', {title: 'Profile Page'});
});
module.exports = router;
