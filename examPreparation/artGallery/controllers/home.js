const { Router } = require('express');
const { isUser } = require('../middlewares/guards');
const galleryService = require('../services/galleryService');

const router = Router();

router.get('/', async (req, res) => {
    const publications = await galleryService.getPublications();
    res.render('home', {title: 'Home Page', publications});
});

router.get('/gallery', async (req, res) => {
    const publications = await galleryService.getPublications();
    res.render('gallery', {title: 'Gallery', publications});
});

router.get('/profile', isUser(), async(req, res) => {
    let myPublications  = await galleryService.myPublications(req.session.user._id);
    let sharedByMe = await galleryService.sharedByMePublications(req.session.user._id);
    if(sharedByMe.length > 0) {
        sharedByMe =sharedByMe.map(x =>x.title).join(', ')
    } else {
        sharedByMe = false;
    }
    myPublications = myPublications.map(x => x.title).join(', '); 

    console.log(myPublications, 'Mine');
    // console.log(sharedByMe, 'SharedByMe');
    res.render('profile', { title: 'Profile Page', myPublications, sharedByMe });
})


module.exports = router;