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

async function update(id, ad) {
    const existing  = await Ad.findById(id);

    existing.headline = ad.headline;
    existing.location = ad.location;
    existing.company = ad.company;
    existing.description = ad.description;

    await existing.save();

}

async function delItem(id) {
    await Ad.findByIdAndDelete(id);
}

async function applyToAd(adId, userId) {
    const existingAd = await Ad.findById(adId);
    if(existingAd.candidates.includes(userId)) {
        throw new Error('You already applied to this ad!');
    }

    existingAd.candidates.push(userId)
    await existingAd.save();
}

async function getSearch(searchedEmail) {

}

module.exports  = {
    getAll,
    getById,
    create,
    update,
    delItem,
    applyToAd,
    getSearch
}