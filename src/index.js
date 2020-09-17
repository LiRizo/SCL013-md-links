const fs = require("fs");//Nos permite acceder al sistema de archivos, viene incorporado en node
let file = process.argv[2];//Toma lo que se le da desde consola
//const axios = require ('axios');//librería para hacer solicitudes HTTP
const fetch1 = require("node-fetch");// libreria para manipurar el canal http
const chalk = require('chalk');
const fetch = require("fetch");
const fetchUrl = fetch.fetchUrl;

//Función que lee el archivo
const getMd = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, file) => {
      if (err) {
        reject(err)
      } else {
        resolve(file)
      }
    })
  })
}
//stats
const urlStats = (links) => {
  let ok = 0;
  let broken = 0;
  for (let i = 0; i < links.length; i++) {
    fetch1(links[i])
      .then((response) => {
        if (response.status === 200) ok++;
        return response;
      })
      .then((response) => {
        if (response.status !== 200) broken++;
        return response;
      })
      .then(() => {
        if (ok + broken === links.length)
          console.log(`
            ${chalk.cyanBright("✔ Total : " + links.length)}
            ${chalk.greenBright("✔ Unique :" + ok)}
            ${chalk.redBright("✖ Broken :" + broken)}`
          );
      });
  }
};

//Función que lee los links de la ruta espeficificada
const expReg = /https?:\/\/(?!.*:\/\/)\S+(?=\))/g;
fs.readFile(file, "utf-8", (err, file) => {
  if (err) {
    console.log(err);
  } else {
    let links = file.match(expReg);
    console.log(file.match(expReg));
    links.forEach(element => {
      getStatus(element)
        .then(res => {
          console.log(chalk.blueBright("El link"), chalk.cyanBright(element), chalk.blueBright("es"), chalk.magentaBright(res));

        })
        .catch(err => {
          console.log(err);
        })
    })
    console.log(`                                                                   `)
    console.log(chalk.yellowBright(`▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪`));
    console.log(`                                                                   `)
    urlStats(links);
    //console.log("Esto es lo que tiene el .md seleccionado", file);
  }

});

//validar
const getStatus = (url) => {
  return new Promise((resolve, reject) => {
    fetchUrl(url, (error, meta) => {
      if (error) {
        reject(error)
      } else {
        resolve([meta.status]);
      }
    })
  });
};
console.log(`                                                                   `)
console.log(chalk.yellowBright(`▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪`));
console.log(`                                                                   `)
console.log(chalk.yellowBright('Linda'), 'y', chalk.yellowBright('Rosario'));
console.log(`                                                                   `)
console.log(chalk.yellowBright(`▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪`));
console.log(`                                                                   `)

