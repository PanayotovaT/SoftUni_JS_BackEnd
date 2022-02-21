const router  = require('express').Router();

router.get('/', (req, res) => {
    console.log('READ Catalog');
    res.end();
});

router.post('/', (req, res) => {
    console.log('CREATE Catalog');
    console.log(req.body);
    res.end();
});

router.get('/:id', (req, res) => {
    console.log('READ Record');
    res.end();
});

router.put('/:id', (req, res) => {
    console.log('UPDATE Record');
    res.end();
});

router.delete('/:id', (req, res) => {
    console.log('DELETE Record');
    res.end();
});

module.exports = router;