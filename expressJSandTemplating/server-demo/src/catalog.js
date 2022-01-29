const router = require('express').Router();
const { getProducts, createProduct, getProductById } = require('./data');

router.get('/', async (req, res) => {
    const products = await getProducts();

    res.locals = {
        title: 'Catalog Page',
        products
    }
    res.render('catalog');
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    console.log(req.body);
    const product = {
        name: req.body.product,
        price: req.body.price,
        promotion: req.body.promotion ? true: false
    };

    await createProduct(product);
    res.redirect('/catalog')
});

router.get('/update/:id',  async (req, res) => {
    const product = await getProductById(req.params.id);
    res.render('edit', product);
});



module.exports  = router; 