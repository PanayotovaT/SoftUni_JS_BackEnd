const { isUser } = require('../middlewares/guards');
const { getAll, getOne } = require('../services/hotelService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const data = await getAll();
    const hotels = data.sort((a, b) => {
        return b.freeRooms - a.freeRooms;
    })
    res.render('home', { title: 'Home Page', hotels });
});

router.get('/details/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const hotel = await getOne(id);

    res.locals.isOwner = req.session.user._id == hotel.owner;

    res.render('details', { title: 'Details Page', hotel });
});

router.get('/profile', (req, res) => {
    res.render('profile', { title: 'Profile Page' });
});
module.exports = router;
