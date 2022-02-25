const router = require('express').Router();
const preload = require('../middleware/preload');
const { isUser } = require('../middleware/guards');
const { getAll, getOne, getOnePopulated } = require('../services/tutorialService');

router.get('/', async (req, res) => {
    let tutorials = await getAll();


    console.log(Date.now());;
    if(req.session.user) {
        tutorials.sort((a, b) => a.create_at -b.create_at );
        tutorials.map(x =>{
            console.log(x.create_at.toString());
            const arr = x.create_at.toString().split(' GMT+0200 ');
            return x.create_at = arr[0];
        });
        res.render('userHome', {title: 'Home Page', tutorials})
    } else {
        tutorials = tutorials.sort((a, b) => b.enrolledUsers.length - a.enrolledUsers.length).slice(0, 3);
        tutorials.map(x => x.enrolledUsersNum = x.enrolledUsers.length);
        res.render('guestHome', {title: 'Home Page', tutorials})
        
    }
})

router.get('/details/:id', isUser(), preload(), (req, res) => {
    
    res.locals.tutorial.isOwner = res.locals.tutorial.owner == req.session.user._id;
    console.log(res.locals.tutorial.enrolledUsers.includes(req.session.user._id));
    console.log(Boolean(res.locals.tutorial.enrolledUsers.includes(req.session.user._id)));
    res.locals.tutorial.isEnrolled = res.locals.tutorial.enrolledUsers.includes(req.session.user._id);
    res.render('details', {title: 'Details Page'})
})
module.exports = router;