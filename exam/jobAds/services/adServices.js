const Ad = require('../models/Ad');

async function getAll() {
    return Ad.find({}).lean();
}

async function getById(id) {
    return Ad.findById(id)
            .populate('author', '_id email')
            .populate('candidates', '_id email skill')
            .lean();
}

async function create(ad) {
    const result  =  new Ad(ad);
    await result.save();
}