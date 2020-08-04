
//const path = require ("path");//Contiene métodos para trabajar con rutas
const fs = require ("fs");//Nos permite acceder al sistema de archivos, viene incorporado en node
let file = process.argv[2];//Toma lo que se le da desde consola
//const axios = require ('axios');//librería para hacer solicitudes HTTP
const fetch = require ("fetch");
const fetchUrl = fetch.fetchUrl;
const colors = require('colors');

/* const options = (file) => {
  console.log("veamos", file)

  let validate = false;
  let stats = false;
validate = file.includes("--validate");
stats = file.includes("--stats");
console.log('probando', validate)
} */
//1. Función de entrada
const mdLinks = (file, arguments = []) => {
  if ((arguments.includes('--stats') && arguments.includes('--validate')) || arguments.includes('-s') && arguments.includes('-v')) {
    getMd(file, {
      validate: true,
      stats: true
    });
  } else if (arguments.includes('--stats') || arguments.includes('-s')) {
    getMd(file, {
      stats: true
    });
  } else if (arguments.includes('--validate') || arguments.includes('-v')) {
    getMd(file, {
      validate: true
    });
  } else {
    getMd(file);
  }
}

//Función que lee el archivo
const getMd = (file, options = {validate: false, stats: false}) => {
  console.log('probando', validate)
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, file) => {
      if (err) {
        return reject(err)
      } else {
        resolve(file)
      }
    })
  })
}

//Función que lee los links de la ruta espeficificada
const expReg = /https?:\/\/(?!.*:\/\/)\S+(?=\))/g;
let arrLinks = [];
fs.readFile(file, "utf-8", (err,file) => {
  if (err){
    console.log(err);
  }else{
    let links = file.match(expReg);
    console.log(file.match(expReg));
    links.forEach(element => {
      getStatus(element)
      .then (res =>{
        console.log("El link", element, "es", res);
      })
      .catch (err => {
        console.log(err);
      })
    })
  }
  return arrLinks;
});

if (options.validate === true && options.stats === true) {
  getStatus(url);
  urlStats(linkObjects);
} else if (options.validate === true) {
  getStatus(url);
} else if (options.stats === true) {
  urlStats(linkObjects)
} else {
// instantiate
const table = new Table({
head: [colors.green('TEXTO'), colors.green('LINK')] , colWidths: [50, 75]
});
}

const getStatus = (url) => {
  return new Promise ((resolve, reject) => {
    fetchUrl(url, (error, meta) => {
      if (error) {
        reject (error)
      } else {
        resolve (meta.status);
      }
    })
  });
};

//4b. Estadísticas
const urlStats = (links) => {
  const href = links.map(link => link.href)
  let resultMd = md.render(href.toString());
  let link = resultMd.split(',');
  let totalLinks = 0;
   link.forEach(element => {
    if (element.includes('md')) {
      totalLinks = totalLinks + 1;
    }
  });
    }

    module.exports = {
      getMd: getMd,
      mdLinks: mdLinks
    }
