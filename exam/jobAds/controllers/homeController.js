const router = require('express').Router();

router.get('/', (req, res) => {
    let ads = []
    res.render('home', { title: 'Home Page', ads })
})

module.exports = router;