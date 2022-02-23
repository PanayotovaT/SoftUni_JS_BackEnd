const Estate = require('../models/Estate');
const User = require('../models/User');

async function getAll() {
   return await Estate.find({}).lean();
};

async function getOne(id){
    return await Estate.findById(id).populate('owner', '_id name').populate('rented', '_id name').lean();
}

async function create(estate){
   const result = new Estate(estate);
   await result.save();
}

async function edit(id, estate) {
    const existing = await Estate.findById(id);

    existing.name =estate.name;
    existing.type =estate.type;
    existing.year =estate.year;
    existing.city =estate.city;
    existing.homeImg =estate.homeImg;
    existing.description =estate.description;
    existing.pieces =estate.pieces;
    existing.rented =estate.rented;

    await existing.save();
}

async function deleteEstate(id) {
    await Estate.findByIdAndDelete(id);
}

async function rentEstate(estateId, userId) { 
    const estate = await Estate.findById(estateId);
    if(estate.rented.includes(userId) ) {
        throw new Error('You already rented this estate!');
    }
    estate.rented.push(userId);
    await estate.save();
}

module.exports = {
    getAll,
    getOne,
    create,
    deleteEstate,
    edit,
    rentEstate

}