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

async function updateTrip(id, trip) {
    const existing = await Trip.findById(id);
    existing.start =  trip.start;
    existing.end =  trip.end;
    existing.date =  trip.date;
    existing.time =  trip.time;
    existing.carImg =  trip.carImg;
    existing.carBrand =  trip.carBrand;
    existing.seats =  trip.seats;
    existing.price =  trip.price;
    existing.description =  trip.description;


    await existing.save()
}

async function deleteTrip(id) {
    await Trip.findByIdAndDelete(id);
}

async function joinTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);
    
    if(trip.buddies.includes(userId)) {
        throw new Error('User is already part of the trip');
    }

    trip.buddies.push(userId);
    await trip.save();
}

module.exports = {
    createTrip,
    getTripById,
    getAllTrips,
    getMyTrips,
    getTripAndUsers,
    deleteTrip,
    updateTrip,
    joinTrip
}