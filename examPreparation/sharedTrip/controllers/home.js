const { getAllTrips } = require('../services/tripService');
const router = require('express').Router();

router.get('/', (req, res) => {
 
    console.log(req.session.user);
    res.render('home', {title: 'Home Page' });
});

router.get('/trips', async (req, res) => {
   
    const trips = await getAllTrips();
    res.render('catalog', { title: 'Shared Trips', trips})
})


module.exports = router;