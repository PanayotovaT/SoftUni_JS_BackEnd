const Ad = require('../models/Ad');

async function getAll() {
    return Ad.find({}).lean();
}

async function getOne(id) {
    return Ad.findById(id).populate('author', '_id email').populate('candidates', '_id, email skill').lean();
}

async function create(ad) {

    const result = new Ad(ad);
    await result.save();
}

async function update(id, ad) {
    const existing = await Ad.findById(id);

    existing.headline = ad.headline;
    existing.location = ad.location;
    existing.company = ad.company;
    existing.description = ad.description;

    await existing.save();
}

async function deleteAd(id) {
    await Ad.findByIdAndDelete(id);
}

async function applyToAd(adId, userId) {
    const ad = await Ad.findById(adId);

    if(ad.candidates.includes(userId)) {
        throw new Error('You already applied to this ad!');
    }

    ad.candidates.push(userId);
    await ad.save();
}

async function getSearch(searchedEmail) {

    const email =  searchedEmail.toLowerCase();
    // const searchRegex = /^[a-zA-Z]+$/;
    const ads = await Ad.find({}).populate('author', '_id email').lean();
    const searchedAds = ads.filter(x => x.author.email == email);
    return searchedAds;
}
module.exports = {
    getOne,
    getAll,
    create,
    update,
    deleteAd,
    applyToAd,
    getSearch

}