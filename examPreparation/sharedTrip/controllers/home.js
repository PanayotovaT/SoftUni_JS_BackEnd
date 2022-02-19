const { getAllTrips, getMyTrips } = require('../services/tripService');
const router = require('express').Router();
const preload = require('../middleware/preload');
const { isUser } = require('../middleware/guards');


router.get('/', (req, res) => {
 
    console.log(req.session.user);
    res.render('home', {title: 'Home Page' });
});

router.get('/trips', async (req, res) => {
   
    const trips = await getAllTrips();
    res.render('catalog', { title: 'Shared Trips', trips})
});

router.get('/trips/:id', preload(true), async (req, res) => {
    console.log(res.locals.trip);
    res.render('details', {title: 'Trip Details'})
});

router.get('/profile', isUser(), async (req, res) => {
    const trips = await getMyTrips(req.session.user._id);
    res.render('profile', {title: 'Profile', trips})
})


module.exports = router;