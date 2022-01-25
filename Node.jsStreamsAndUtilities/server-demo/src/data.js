const fs = require('fs').promises;

async function readFile() {
    const data = JSON.parse((await fs.readFile('./data/products.json')).toString());
    return data;
}
async function getProducts(){
    const data = await readFile();
    return Object
    .entries(data)
    .map(([id, item] )=> Object.assign({}, item, {_id: id}));

}

async function getProductById(id) {
    const data = await readFile();
    return data[id];

}

async function createPrpduct(item) {
    const data = await readFile();
    const _id = nextId();
    data[_id] = item;

    await fs.writeFile('./data/products.json', JSON.stringify(data, null, 2))


}

async function updateProduct(id, item) {
    const data = await readFile();
    data[id] = item;
    await fs.writeFile('./data/products.json', JSON.stringify(data, null, 2))
}
function nextId() {
    return 'xxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}

module.exports = {
    getProducts,
    createPrpduct,
    getProductById,
    updateProduct
}