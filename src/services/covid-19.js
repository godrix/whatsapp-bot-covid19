const fs = require("fs");
const fetch = require("node-fetch");

const BASE_WORLD = "https://covid19.mathdro.id/api";
const BASE_BRAZIL = "https://covid19.mathdro.id/api/countries/BR";
const BASE_UF = "https://covid19-brazil-api.now.sh/api/report/v1";

async function getData() {
  let dataWorld, dataBrazil, dataUF;

  await fetch(BASE_WORLD)
    .then(res => res.json())
    .then(json => {
      dataWorld = {
        confirmed: json.confirmed.value,
        recovered: json.recovered.value,
        deaths: json.deaths.value
      }

    });

  await fetch(BASE_BRAZIL)
    .then(res => res.json())
    .then(json => {
      dataBrazil = {
        confirmed: json.confirmed.value,
        recovered: json.recovered.value,
        deaths: json.deaths.value
      }

    });

  await fetch(BASE_UF)
    .then(res => res.json())
    .then(json => {
      dataUF = json.data;
    });

  createFileJson({ dataWorld, dataBrazil, dataUF })
}

function createFileJson(json) {
  fs.writeFileSync('data.json', JSON.stringify(json, null, 4), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}


setInterval(() => {
  getData();
}, 3600000);

getData();