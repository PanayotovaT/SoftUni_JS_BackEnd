const router = require('express').Router();
const { getAll } = require('../services/adServices');
const { isUser } = require('../middlewares/guards');
const preload =  require('../middlewares/preload');


router.get('/', async (req, res) => {
    let ads = await getAll();
    ads.map(x => x.candidatesNum = x.candidates.length)
    ads = ads.slice(0, 3);

    res.render('home', { title: 'Home Page', ads })
});

router.get('/ads', async (req, res) => {
    let ads =  await getAll();

    res.render('ads', {title: 'All Advertisements', ads})
});

router.get('/details/:id', isUser(), preload(), async (req, res) => {
    const ad = res.locals.ad;
    const userId = req.session.user?._id;

    res.locals.isOwner = ad.author._id == userId;

    if(ad.candidates.some(x => x._id == userId)) {
        res.locals.hasApplied = true;
    }

    res.locals.candidates = ad.candidates;
    res.locals.candidatesNum = ad.candidates.length;
    
    res.render('details', {title: 'Details Page'});

})

module.exports = router;