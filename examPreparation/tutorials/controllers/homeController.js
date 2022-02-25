const router = require('express').Router();
const preload = require('../middleware/preload');
const { isUser } = require('../middleware/guards');
const { getAll } = require('../services/tutorialService');

router.get('/', async (req, res) => {
    const tutorials = await getAll();

    if(req.session.user) {
        res.render('userHome', {title: 'Home Page', tutorials: []})
    } else {
        res.render('guestHome', {title: 'Home Page', tutorials: []})
        
    }
})

module.exports = router;