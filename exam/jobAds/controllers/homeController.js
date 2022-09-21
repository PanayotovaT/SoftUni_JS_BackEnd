const router = require('express').Router();
const { getAll } = require('../services/adServices');

router.get('/', async (req, res) => {
    let ads = await getAll();
    ads.map(x => x.candidatesNum = x.candidates.length)
    ads = ads.slice(0, 3);

    res.render('home', { title: 'Home Page', ads })
});

router.get('/ads', async (req, res) => {
    let ads =  await getAll();

    res.render('ads', {title: 'All Advertisements', ads})
})

module.exports = router;