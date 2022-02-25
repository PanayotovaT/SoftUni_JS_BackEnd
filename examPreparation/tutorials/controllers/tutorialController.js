const router = require('express').Router();
const preload = require('../middleware/preload');
const { isUser } = require('../middleware/guards');
const {create} = require('../services/tutorialService');
const mapErrors = require('../util/mappers');

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page' })
});

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page' })
});

router.post('/create', isUser(), async (req, res) => {
    console.log(req.session);
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        owner: req.session.user._id,
    }
    try {
        console.log(tutorial)
        await create(tutorial);

        res.redirect('/');

    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Page', errors, data: tutorial })
    }
});

module.exports = router;
