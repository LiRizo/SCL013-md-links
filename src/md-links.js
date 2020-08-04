const indexFunctions = require('../src/index');
const [, , ...arguments] = process.argv;

//console.log(arguments[2], arguments[3]);

let file = process.argv[2];


//después esto hay que transformarlo en mdLinks(path, options) para versión API;
indexFunctions.mdLinks(file, arguments);


