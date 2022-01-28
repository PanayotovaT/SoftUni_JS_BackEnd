const {Router} = require('express');

const router = Router();


router.get('/', (req, res) => {
    res.send('Catalog');
});

router.get('/:productId', (req, res) => {
    res.send('Product Page');
    console.log(req.params);

});

router.get('/:productId/details', (req, res) => {
    res.send('Details page');
});

router.get('/:category/:productId', (req, res) => {
    console.log(req.params);
    res.send('Product from category');
});


module.exports = router;