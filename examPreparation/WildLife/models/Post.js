const { Schema, model, Types: {ObjectId}} = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const postSchema = new Schema({
    title: {type: String, minlength: [6, 'Title must be at least 6 characters'] },
    keyword: {type: String, minlength: [6, 'Keyword must be at least 6 characters']},
    location: {type: String, maxlength: [15, 'Location must be at most 15 characters']},
    date: {type: String, 
        minlength: [10, 'Date must be at least 10 characters'],
        maxlength: [10, 'Date must be at most 10 characters']
    },
    image: {type: String, validate: {
        validator(value){
            return URL_PATTERN.test(value);
        },
        message: 'Image must be a valid URL'
    }},
    description: {type: String, minlength: [8, 'Description must be at least 8 characters'] },
    author: {type: ObjectId, ref: 'User', required: true },
    votes: {type: [ObjectId], ref: 'User', default: []},
    rating: {type: Number, default: 0 }
});

const Post = model('Post', postSchema);

module.exports = Post;