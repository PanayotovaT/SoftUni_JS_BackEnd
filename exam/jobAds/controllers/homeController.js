const router = require('express').Router();


router.get('/', async (req, res) => {
    let ads = [];
    ads.map(x => x.candidatesNum = x.candidates.length);
    ads.slice(0, 3);

    res.render('home', {title: 'Home Page', ads})
})

module.exports = router;