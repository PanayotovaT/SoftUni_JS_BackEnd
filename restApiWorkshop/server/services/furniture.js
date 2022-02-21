const Item = require('../models/Item');

async function getAll() {
    return Item.find({});

}

async function getOne(id) {
    return Item.findById(id);
}

async function getMyItems(userId) {

}

async function create(item) {
    const result = new Item(item);
    await result.save();

    return result;
}

async function update(id, item){

}

async function deleteItem(id) {

}

module.exports = {
    getAll,
    getOne,
    getMyItems,
    create,
    update,
    deleteItem

}