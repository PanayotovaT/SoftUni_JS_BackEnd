const Post = require('../models/Post');

async function createPost(post) {
    const result = new Post(post);
    await result.save();

    return result;
}

async function getPosts() {
    return await Post.find({});
}

async function getPostById(id) {
    return await Post.findById(id);
}

module.exports = {
    createPost,
    getPosts,
    getPostById
}
