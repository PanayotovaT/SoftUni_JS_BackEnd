const { getAll, getOne } = require('../services/estateService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    
    const estates = (await getAll()).slice(-3);
    res.render('home', { title: 'Home Page', estates});
});

router.get('/catalog',async (req, res) => {
    const estates = await getAll();
    res.render('catalog', { title: 'Catalog Page', estates})
});


router.get('/details/:id', async (req, res) => {

    const estate = await getOne(req.params.id);
    console.log(estate)
    res.locals.isOwner = estate.owner._id == req.session.user?._id;
    res.locals.available = estate.pieces - estate.rented.length;
    res.locals.placeToRent = res.locals.available > 0;
    
    console.log(estate.rented);
    if(estate.rented.some(x => x._id == req.session.user?._id)) {
        estate.alreadyRented =  true;
    }
    
    res.locals.rentList = estate.rented.map(x => x.name).join(', ');
    console.log(estate.rented);
    console.log(res.locals.rentList);
    res.render('details', { title: 'Details Page', ...estate })
});


router.get('/search', (req, res) => {
    res.render('search', { title: 'Search Page'})
});




module.exports = router;