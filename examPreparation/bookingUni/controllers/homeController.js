const { isUser } = require('../middlewares/guards');
const { getAll, getOne, hasBooked } = require('../services/hotelService');
const { getUserById } = require('../services/authService');
const preload = require('../middlewares/preload');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const data = await getAll();
    const hotels = data.sort((a, b) => {
        return b.freeRooms - a.freeRooms;
    });
    hotels.map(x => x.freeRooms = x.freeRooms -x.bookings.length);
    res.render('home', { title: 'Home Page', hotels });
});

router.get('/details/:id', isUser(), preload(),async (req, res) => {
    const id = req.params.id;

    res.locals.isOwner = req.session.user._id == res.locals.hotel.owner;
    res.locals.userHasBooked = await hasBooked(id, req.session.user._id);
    res.locals.hotel.freeRooms = res.locals.hotel.freeRooms - res.locals.hotel.bookings.length;
    res.render('details', { title: 'Details Page'});
});

router.get('/profile', isUser(), async (req, res) => {
    const user = await getUserById(req.session.user._id);
    console.log(user);
    user.bookingList  = user.bookedHotels.map(x => x.name).join(', ');


    res.render('profile', { title: 'Profile Page', user });
});

module.exports = router;
