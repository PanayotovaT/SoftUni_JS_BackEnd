const bcrypt  = require('bcrypt');

const pass1 = '123456';
const hash = '$2b$10$z/bZMWthB9.EbMcp8eSfF.Pqhmvi1tKQUsZM6rQBrtw1knjx9r0BW';

async function start() {
    // const hash  = await bcrypt.hash(pass1, 10);
    console.log(await bcrypt.compare(pass1, hash));
}

start();
