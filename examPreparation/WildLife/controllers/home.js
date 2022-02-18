const { isUser } = require('../middleware/guards');
const { getPosts, getPostById, getPostsByAuthor } = require('../services/post');
const { postViewModel, mapErrors } = require('../util/mappers');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' })
})

router.get('/catalog', async (req, res) => {

    const posts = (await getPosts()).map(postViewModel);
    res.render('catalog', { title: 'Catalog Page', posts })
});

router.get('/catalog/:id', async (req, res) => {
    const id = req.params.id;
    const post = postViewModel(await getPostById(id));

    if (req.session.user) {
        post.hasUser = true;
        if (req.session.user._id == post.author._id) {
            post.isAuthor = true;
        } else {
            post.hasVoted = Object.values(post.votes).some(x => x._id == req.session.user._id);
        }


    }

    res.render('details', { title: post.title, post })
});

router.get('/profile', isUser(), async (req, res) => {
    try {
        const posts = (await getPostsByAuthor(req.session.user._id)).map(postViewModel);
        console.log(posts)
        res.render('my-posts', { title: 'My Posts', posts })
    
    } catch (err) {
        console.log(err);
        const errors = mapErrorss(err);
        res.render('my-posts', { title: 'My Profile', posts, errors })
    }
})


module.exports = router