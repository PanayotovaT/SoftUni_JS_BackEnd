const { getAll } = require('../services/estateService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    
    const estates = (await getAll()).slice(-3);
    res.render('home', { title: 'Home Page', estates});
});

router.get('/catalog',async (req, res) => {
    const estates = await getAll();
    res.render('catalog', { title: 'Catalog Page', estates})
});

router.get('/search', (req, res) => {
    res.render('search', { title: 'Search Page'})
});




module.exports = router;