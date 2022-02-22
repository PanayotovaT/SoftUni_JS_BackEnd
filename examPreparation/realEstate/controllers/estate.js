const router = require('express').Router();

router.get('/details/:id', (req, res) => {
    res.render('details', { title: 'Details Page'})
});

router.get('/create', (req, res) => {
    res.render('create', {title: 'Create Page'});
});

router.get('/edit', (req, res) => {
    res.render('edit', {title: 'Edit Page'});
});

module.exports = router;