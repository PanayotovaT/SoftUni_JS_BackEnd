const router = require('express').Router();
const { getProducts } = require('./data');

router.get('/', async (req, res) => {
    const products = await getProducts();

    res.locals = {
        title: 'Catalog Page',
        products
    }
    res.render('catalog');
});

router.get('/create', (req, res) => {
    
})

module.exports  = router; 