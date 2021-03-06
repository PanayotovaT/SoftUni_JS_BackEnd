function mapErrors(error) {
    if(Array.isArray(error)) {
        return error
    } else if(error.name == 'ValidationError'){
        return Object.values(error.errors).map(e => ({msg: e.message}))
    } else if(typeof error.message == 'string') {
        return [{msg: error.message}]
    } else {
        return [{msg: 'Request Error'}];
    }
}

function postViewModel(post){
    return {
        title: post.title,
        keyword: post.keyword,
        location: post.location,
        date: post.date,
        image: post.image,
        description: post.description,
        author: authorViewModel(post.author),
        votes: post.votes.map(voterViewModel),
        rating: post.rating,
        _id: post._id
    }
}

function authorViewModel(user) {
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName
    }
}

function voterViewModel(user) {
    return {
       _id: user._id,
       email: user.email
    }
}
module.exports = {
    mapErrors,
    postViewModel
};