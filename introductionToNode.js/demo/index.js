const xlsx = require('xlsx');
const fs = require('fs');
const util = require('./util');

util.print('Hello');
util.fancyPint('This is Alex');

fs.writeFileSync('./output.txt', 'Hello World!');

