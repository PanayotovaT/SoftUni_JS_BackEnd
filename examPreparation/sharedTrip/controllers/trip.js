const router = require('express').Router();
const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createTrip } = require('../services/tripService');
const mapErrors = require('../util/mappers');

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
})

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page' })
});

router.post('/create', isUser(),async (req, res) => {

    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImg: req.body.carImg,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
        owner: req.session.user._id
    }
    try {

        await createTrip(trip);
        res.redirect('/trips');

    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Page', errors })
    }
});

router.get('/edit/:id', preload(), (req, res) => {

    res.render('edit', { title: 'Edit Page'})
})


module.exports = router;
