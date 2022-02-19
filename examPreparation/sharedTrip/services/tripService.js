const Trip =  require('../models/Trip');

async function getAllTrips() {
    return Trip.find({}).lean();
}

async function getMyTrips (userId) {
    return Trip.find({'owner': userId}).populate('owner', '_id email gender').lean()
}

async function getTripById (id) {
    return Trip.findById(id).lean();
}

async function getTripAndUsers (id) {
    return Trip.findById(id).populate('owner','_id email gender').populate('buddies', '_id email').lean();
}

async function createTrip(trip) {

    const result  = new Trip(trip);
    await result.save();
}

module.exports = {
    createTrip,
    getTripById,
    getAllTrips,
    getMyTrips
}