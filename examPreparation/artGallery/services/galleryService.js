const Publication = require('../models/Publication');

async function getPublications() {
    const publications = await Publication.find({}).lean();
    return publications;
}

async function getPublication(id) {
    const publication = await Publication.findById(id).populate('author').lean();
    return publication;
}

async function createPublication(publication) {
    const newPublication = new Publication(publication);
    await newPublication.save();
    return newPublication;
}

async function updatePublication(id, publication) {
    const existingPublication = await Publication.findById(id);
    console.log('existing',existingPublication);
    existingPublication.title = publication.title;
    existingPublication.technique = publication.technique;
    existingPublication.imageUrl = publication.imageUrl;
    existingPublication.certificate = publication.certificate;

    await existingPublication.save();

}

async function deletePublication(id) {
    await Publication.findByIdAndDelete(id);
}

async function sharePublication(publicationId, userId) {

    const publication = await Publication.findById(publicationId);
   
    publication.sharedBy.push(userId);

    await publication.save();
}

async function myPublications(userId) {
    const publications = await Publication.find({author: userId});
    return publications;
}

async function sharedByMePublications(userId) {
    const publications = await Publication.find().all('sharedBy', [`${userId}`]);
    return publications;
 }

module.exports = {
    getPublications,
    getPublication,
    createPublication,
    updatePublication,
    deletePublication,
    sharePublication,
    myPublications,
    sharedByMePublications
}