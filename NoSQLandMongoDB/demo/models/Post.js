const {Schema, model, Types} = require('mongoose');

const postSchema  =  new Schema({
    author: {type: String, required:true},
    title: { type: String, required: true, minlength: 10},
    content: {type: String, required: true },
    comments: {type: [Types.ObjectId], default: [], ref: 'Comment'}
});

const Post = model('Post', postSchema);

module.exports = Post;