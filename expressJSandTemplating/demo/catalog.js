const {Router} = require('express');

const router = Router();


router.get('/catalog/', (req, res) => {
    res.send('Catalog');
});

router.get('/catalog/:productId', (req, res) => {
    res.send('Product Page');
    console.log(req.params);

});

router.get('/catalog/:productId/details', (req, res) => {
    res.send('Details page');
});

router.get('/catalog/:category/:productId', (req, res) => {
    console.log(req.params);
    res.send('Product from category');
});


module.exports = router;