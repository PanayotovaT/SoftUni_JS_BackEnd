const mongoose = require('mongoose');
const Post =  require('./models/Post');
const Comment = require('./models/Comment')

const connectionString = 'mongodb://127.0.0.1:27017/test';

start();

async function start() {
    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('Database connected!');

    // await Post.create({
    //     author:'Peter',
    //     title: 'My first post',
    //     content:' Lorem Ipsum Content. Istrem fewinagu julediun.'
    // });

    // await Comment.create({
    //     author: 'Lucas',
    //     content: 'Great article!'
    // });

    /*
    const comment  =  await  Comment.findOne({});
    const post = await Post.findOne({});
    post.comments.push(comment);
    
    await post.save();
    */
   const post  =  await Post.findOne({}).populate('comments', 'content');
   console.log(post);

}