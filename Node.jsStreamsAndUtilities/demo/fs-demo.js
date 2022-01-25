// const fs =  require('fs');
// /*
// const file = fs.readFileSync('./file.txt');
// console.log(file.toString());
// */

// fs.readFile('./file.txt', (err, data) => {
//     console.log(data.toString());
// });
//----------------------------

// const fs =  require('fs').promises;

// async function start() {
//     const data  =  await fs.readFile('./file.txt');
//     console.log(data.toString());
// }
// start();
// -----------------------------------
const fs =  require('fs');

// const list  = fs.readdirSync('./');
// console.log(list);
//--------------------------
// fs.readdir('./', (err, data) => {
//     console.log(data);
// })

//----------------------

// fs.rmdir('./test',()=> {
  
//     console.log('File deleted')
// });
//---------------------------

// fs.rmSync('./test.txt');
//----------------------------

//fs.renameSync('./toRenameFile.js', './renamedFile.js');

//----------------------------

// fs.unlink('./test.txt', () => {
//     console.log('deleted')
// });
//-----------------
// fs.writeFileSync('./newFile.txt', 'Hello again!');
//----------------------------

// const data = JSON.parse(fs.readFileSync('./data.json'));
// console.log(data);
// data.category = 'kid';

// fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
//-----------------------------

fs.readFile('./data.json', (err, dataAsText) => {
    let data = JSON.parse(dataAsText);
    data.age++;

    fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err)=> {
        console.log('Write completed!')
    })
})