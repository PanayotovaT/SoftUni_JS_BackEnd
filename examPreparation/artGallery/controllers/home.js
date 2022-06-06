const { Router } = require('express');
const galleryService = require('../services/galleryService');

const router = Router();

router.get('/', async (req, res) => {
    const publications = await galleryService.getPublications();

    res.render('home', {title: 'Home Page', publications});
});

router.get('/gallery', async (req, res) => {
    const publications = await galleryService.getPublications();
    res.render('gallery', {title: 'Gallery', publications});
})

router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found'});
})

module.exports = router;