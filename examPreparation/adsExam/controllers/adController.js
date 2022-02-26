const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { create, deleteAd, update, applyToAd, getSearch } = require('../services/adServices');
const mapErrors = require('../util/mappers');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {

    res.render('create', { title: 'Create Page' })
});

router.post('/create', isUser(), async (req, res) => {
    const ad =
    {
        headline: req.body.headline,
        location: req.body.location,
        company: req.body.company,
        description: req.body.description,
        author: req.session.user._id
    }
try{
    await create(ad);
    res.redirect('/ads');
} catch (err) {
    console.log(err);
    const errors = mapErrors(err);
    res.render('create', {data: ad, errors , title: 'Create Page'})
}

});

router.get('/edit/:id',isUser(), preload(), isOwner(), async (req, res) => {
   
    res.render('edit', { title: 'Edit Page' });
});

router.post('/edit/:id', isUser(), preload(), isOwner(), async(req, res) => {
    const id = req.params.id;
 
    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        company: req.body.company,
        description: req.body.description,
    }
    try{
        await update(id, ad);
        res.redirect('/details/' + id);
    } catch(err) {
        console.log(err);
        ad._id = req.params.id;
        const errors = mapErrors(err);
        res.render('edit', {ad: ad, errors , title: 'Edit Page'})
    }
})

router.get('/delete/:id', isUser(), preload(), isOwner(), async (req, res) => {

    await deleteAd(req.params.id);
    res.redirect('/ads')
    
});

router.get('/apply/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    console.log(id);
    console.log(req.session.user._id);

    try {
        await applyToAd(id, req.session.user._id);
    } catch (err) {
        console.log(err);
    } finally {
        res.redirect('/details/' + id);
    }
});

router.get('/search', isUser(), (req, res) => {
    res.render('search', {title: 'Search Page', search: []});
})
router.post('/search', isUser(), async (req, res) => {

    if(req.body.searchedEmail) {
        const searchedEmail = req.body.searchedEmail;
        console.log(req.body.searchedEmail);
        const search = await getSearch(searchedEmail);
        console.log(search);
        res.render('search', {title: 'Search Page', search, searchedEmail})
    } else {
        res.render('search', {title: 'Search Page', search: []});
    }
})

module.exports = router;