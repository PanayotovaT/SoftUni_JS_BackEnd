const preload = require('../middleware/preload');
const { getAll, getOne } = require('../services/adServices');

const router =  require('express').Router();

router.get('/', async (req, res) => {
    let ads = await getAll()
    ads.map(x => x.candidatesNum = x.candidates.length);
    ads = ads.slice(0, 3);
    res.render('home', {title: 'Home Page', ads})
});

router.get('/ads', async (req, res) => {
    let ads = await getAll();

    res.render('ads', {title: 'All Ads Page', ads})
});

router.get('/details/:id', preload(), async (req, res) => {
    res.locals.isOwner = res.locals.ad.author._id == req.session.user?._id;
    const ad = res.locals.ad;
    if(ad.candidates.some(x =>x._id == req.session.user?._id)) {
        res.locals.hasApplied = true;
    }
    res.locals.candidates = res.locals.ad.candidates;
    console.log(res.locals.candidates);
    res.locals.candidatesNum = ad.candidates.length;
    res.render('details', { title: 'Details Page'})
})
module.exports = router;