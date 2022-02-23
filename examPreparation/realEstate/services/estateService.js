const Estate = require('../models/Estate');
const User = require('../models/User');

async function getAll() {
   return await Estate.find({}).lean();
};

async function getOne(id){
    return await Estate.findById(id).populate('rented', 'name, _id').populate('owner', '_id, name').lean();
}

async function create(estate){
   const result = new Estate(estate);
   await result.save();
}

async function edit(id, estate) {

}

async function deleteEstate(id) {
    await Estate.findByIdAndDelete(id);
}

async function getMyEstates(userId) {

}

module.exports = {
    getAll,
    getOne,
    create,
    deleteEstate

}