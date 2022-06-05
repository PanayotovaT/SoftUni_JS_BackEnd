const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {

    res.render('home', {title: 'Home Page'});
});


router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found'});
})

module.exports = router;