const Tutorial =  require('../models/Tutorial');

async function getAll() {
    return Tutorial.find({}).lean();
}


async function getOne (id) {
    return Tutorial.findById(id).lean();
}

async function getTutorialEnrolledUsers (id) {
    return Tutorial.findById(id).populate('enrolledUsers','_id username').lean();
}

async function getUserEnrolledCourses (userId) {
    return Tutorial.findById(userId).populate('enrolledCourses','_id name').lean();
}

async function create(tutorial) {

    const result  = new Tutorial(tutorial);
    await result.save();
}

async function update(id, tutorial) {
    const existing = await Tutorial.findById(id);
    existing.title =  tutorial.title;
    existing.description =  tutorial.description;
    existing.imageUrl =  tutorial.imageUrl;
    existing.duration =  tutorial.duration;

    await existing.save()
}

async function deleteTutorial(id) {
    await Tutorial.findByIdAndDelete(id);
}

// async function joinTrip(tripId, userId) {
//     const trip = await Trip.findById(tripId);
    
//     if(trip.buddies.includes(userId)) {
//         throw new Error('User is already part of the trip');
//     }

//     trip.buddies.push(userId);
//     await trip.save();
// }

module.exports = {
    create,
    getOne,
    getAll,
    getTutorialEnrolledUsers,
    getUserEnrolledCourses,
    deleteTutorial,
    update,
    // joinTrip
}