const router = require('express').Router();

const { create, delItem, update, applyToAd, getSearch } = require('../services/adServices');
const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const mapErrors = require('../util/mappers');

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Page' });
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
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('create', { data: ad, errors, title: 'Create Page' });
    }

});

router
    .get('/edit/:id', isUser(), preload(), (req, res) => {
        res.render('edit', { title: 'Edit page' });
    })
    .post('/edit/:id', isUser(), async (req, res) => {
        let id = req.params.id;
        let ad = {
            headline: req.body.headline.trim(),
            location: req.body.location.trim(),
            company: req.body.company.trim(),
            description: req.body.description.trim(),
        }

        try {
            await update(id, ad);
            res.redirect(`/details/${id}`);
        }catch(err) {
            console.log(err);
            ad._id = req.params.id;
            const errors = mapErrors(err);
            res.render('edit', {title: 'Update Page', ad, errors})
        }
    });

    router.get('/delete/:id', preload(), isUser(), isOwner(), async (req, res) => {
        let id = req.params.id;
       
        try {
            await delItem(id);
            res.redirect('/ads');
        }catch(err) {
            console.log(err);
            return;
        }

    });

router.get('/apply/:id', isUser(), async (req, res) => {
    const id  = req.params.id;

    try {
        await applyToAd(id, req.session.user._id);
    } catch(err) {
        console.log(err)
    } finally{
        res.redirect('/details/' +id)
    }
})

router.get('/search', isUser(), async( req, res) => {
    res.render('search', { title: 'Search Page'})
});



module.exports = router;