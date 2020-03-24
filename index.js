const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require("fs");
// const UF = require("./src/utils/index");

const client = new Client();

let dataWorld, dataBR, dataUF;

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body.toLowerCase() == 'corona') {
        msg.reply(`Bot Informativo sobre casos da COVID-19 no Brasil, Dados obtidos na plataforma do Ministério da Saúde e OMS.
        
        Escolha a opcão a baixo:

        0️⃣ *Situação no Mundo*
        1️⃣ *Situaão por Brasil*
        2️⃣ *Situaão por Estados*
        3️⃣ *Sintomas*
        4️⃣ *Prevenção*
        `);
    }

    switch (msg.body) {
        case '0':
            msg.reply(`🦠Casos de Corona vírus pelo Mundo🗺️
            
                😷 Confirmados: *${dataWorld.confirmed}*
                🙂 Recuperados: *${dataWorld.recovered}*
                ⚰ Obítos: *${dataWorld.deaths}*
            `)
            break;
        case '1':
            msg.reply(`🦠Casos de Corona vírus no Brasil🇧🇷
            
            😷 Confirmados: *${dataBR.confirmed}*
            🙂 Recuperados: *${dataBR.recovered}*
            ⚰ Obítos: *${dataBR.deaths}*
        `)
            break;
        case '2':
            msg.reply(`Digite a sigla do estado: 
            ex SC para Santa Catarina`);
            break;
        case '3':
            msg.reply(`Alguns Sintomas relatados

            😨 *Tosse seca*
            🤒 *Febre*
            😪 *Expectoração*
            🤕 *Dores musculares ou nas articulações*
            😴 *Fadiga*
            😫 *Falta de ar*
            😖 *Garganta inflamada*
            🤥 *Congestão nasal*
            🥶 *Calafrios*
            🤮 *Náuseas ou vómitos*
            🚽 *Diarreia*
            🤯 *Dor de cabeça*`)
        break;
        case '4':
            msg.reply(`*Prevenções*

            - 👏 Lave as mãos com água e sabão ou use álcool em gel
            - 🤧 Cubra o nariz e boca ao espirrar ou tossir
            - 🏟 Evite aglomerações se estiver doente
            - 🚰 Não compartilhe objetos pessoais
            - 🖼 Mantenha os ambientes bem ventilados`);
        break;
        default:
    }


    if(msg.body.length === 2){
        let state = dataUF.find(ele => ele.uf === msg.body.toUpperCase() )

        msg.reply(`🦠 Casos de Corona vírus em ${state.state}

            😷 Suspeitos: *${state.suspects}*
            😷 Descartados: *${state.refuses}*
            😷 Confirmados: *${state.cases}*
            ⚰ Obítos: *${state.deaths}*
        `)
    }

});

const readData = () => {
    fs.readFile('./data.json', 'utf-8', function (err, data) {
      const allData = JSON.parse(data);

      dataWorld = allData.dataWorld;
      dataBR = allData.dataBrazil;
      dataUF = allData.dataUF;

    });
  }

setInterval(() => {
    readData();
}, 3600000);


readData();
client.initialize();
