const router = require('express').Router();
const preload = require('../middleware/preload');
const { isUser, isOwner } = require('../middleware/guards');
const {create, deleteTutorial, enrollToTutorial} = require('../services/tutorialService');
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

router.get('/delete/:id', isUser(), preload(), isOwner(), async (req, res ) => {
await deleteTutorial(req.params.id);
res.redirect('/');
});

router.get('/enroll/:id', isUser(), async (req, res) => {
    const id = req.params.id;
  
    await enrollToTutorial(id, req.session.user._id);
    res.redirect('/details/' + id); 

})

module.exports = router;
