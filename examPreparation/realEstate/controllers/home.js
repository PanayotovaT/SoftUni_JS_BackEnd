const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page'})
});

router.get('/catalog', (req, res) => {
    res.render('catalog', { title: 'Catalog Page'})
});

router.get('/search', (req, res) => {
    res.render('search', { title: 'Search Page'})
});




module.exports = router;