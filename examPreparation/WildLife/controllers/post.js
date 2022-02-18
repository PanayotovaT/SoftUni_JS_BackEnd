const { isUser } = require('../middleware/guards');

const router = require('express').Router();


router.get('/create', isUser(), (req, res) => {
    res.render('create', {title: 'Create Page'});
});

router.post('/create', isUser(), async (req, res) => {

    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
    }
})

module.exports = router;