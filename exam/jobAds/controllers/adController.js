const router = require('express').Router();

const { create, deleteAd, update, applyToAd, getSearch } = require('../services/adServices');
const mapErrors = require('../util/mappers');

router.get('/create', (req, res)=> {
    res.render('create', {title: 'Create Page'});
});

router.post('/create', async (req, res) => {
    const ad =
        {
            headline: req.body.headline,
            location: req.body.location,
            company: req.body.company,
            description: req.body.description,
            author: req.session.user._id
        };

    try {
        await create(ad);
        res.redirect('/');
    }catch(err){
        console.log(err);
        const errors = mapErrors(err);
        res.render('create', {data: ad, errors , title: 'Create Page'});
    }

})

module.exports = router;