const { Router } = require('express');
const galleryService = require('../services/galleryService');
const preload = require('../middlewares/preload');

const router = Router();


router.get('/create-publication', (req, res ) => {
    res.render('create', {title: 'Create Page'});
});

router.post('/create-publication', async (req, res) => {
    const title = req.body.title.trim();
    const technique = req.body.technique.trim();
    const imageUrl = req.body.imageUrl.trim();
    const certificate = req.body.certificate.trim();
    
    const publication = {
        title,
        technique,
        imageUrl,
        certificate,
        author: req.session.user._id,
    }
    try {
        await galleryService.createPublication(publication);
        res.redirect('/');
    } catch(err) {
        console.log(err);
        res.render('create', { title: 'Create page', publication});
    }  
});

router.get('/details/:id',preload(), (req, res) => {
    res.render('details', {title: 'Details Page'})

})



module.exports = router;

