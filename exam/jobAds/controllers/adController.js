const router = require('express').Router();

router.get('/create', (req, res) {
    res.render('create', {title: 'Create Page'});
})