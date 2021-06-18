const baseFunctions = require("./baseFunctions");
const readCommands = require("./readFunctions");
const adminID = require("./admin")


const commands = () => {
  return {
    help: (context) => {
      const msg = "Te muestro cuales son mis comandos:\n\n*Ayuda:*\n*/g help*: Muestro todos los comandos. \n*/g list 1 12*: Muestro una lista de todos los gastos en un intervalo de tiempo. En el caso de solo porne un parámetro tomaré esa fecha hasta el día de hoy \n*/g total 1 12*: Muestro el total gastado en un intervalo de tiempo. En el caso de solo poner un parámetro tomaré desde esa fecha hasta el día de hoy.\*/g about*: Acá podés ver todo lo relacionado a mi.\n\nCada vez que haya un cambio te voy a avisar.";
      context.bot.sendMessage(context.chatID, msg, { parse_mode: "Markdown" })
    },
    about: (context) => {
      const msg = "Soy Apolo!🐶\nTe ayudo a acomodar y controlar tus cuentas.\nActualmente estoy en desarrollo y espero estar agregando siempre nuevas funcionalidades para ayudarte en tus finanzas.\nPor acá abajo podés encontrar toda la info relacionada a mi y mis creadores."

      context.bot.sendMessage(context.chatID, msg, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Repositorio", url: "https://github.com/kotorigadaisuki/BotDeCuentas" },
            ]
          ]
        }
      })

    },
    list: (context) => {
      const bot = context.bot;
      const message = context.message;
      const chatId = context.chatID;
      const user = context.user;
      const name = user.first_name

      if (message[1] == undefined && message[2] == undefined) {
        bot.sendMessage(chatId, "El comando list necesita parametros.")
      } else {
        // VALIDA EL ARRAY MENSAJE PARA SABER SI SON NÚMEROS ENTEROS Y SI ESTÁN ENTRE 1 Y 12
        const params = message.slice(1, 3).map(element => parseInt(element));
        if (params.every(numero => !isNaN(numero)) && params.every(numero => (numero >= 1) && (numero <= 12))) {
          // VERIFICA SI EXISTE UN SEGUNDO PARÁMETRO
          if (message[2] != undefined) {
            //EN EL CASO DE QUE EXISTA ORDENA LOS VALORES

            const date = params.sort()
            readCommands.readPartialDb(name, date, chatId, (response) => {
              bot.sendMessage(chatId, `${name} tu lista de gastos desde ${baseFunctions.parseDataToString(date[0])} hasta ${baseFunctions.parseDataToString(date[1])} es:\n ${response}`);
            })
          } else {
            const date = baseFunctions.getDate(params[0]); //PARSEA LA FECHA
            readCommands.readPartialDb(name, date, chatId, (response) => {
              bot.sendMessage(chatId, `${name} tu lista de gastos desde ${baseFunctions.parseDataToString(params[0])} hasta hoy es:\n ${response}`);
            });
          }
        }
      }


    },
    total: (context) => {

      const bot = context.bot;
      const message = context.message;
      const chatId = context.chatID;
      const user = context.user;
      const name = user.first_name

      if (message[1] == undefined && message[2] == undefined) {
        bot.sendMessage(chatId, "El comando total necesita parametros.")
      } else {
        // VALIDA EL ARRAY MENSAJE PARA SABER SI SON NÚMEROS ENTEROS Y SI ESTÁN ENTRE 1 Y 12
        const params = message.slice(1, 3).map(element => parseInt(element));
        if (params.every(numero => !isNaN(numero)) && params.every(numero => (numero >= 1) && (numero <= 12))) {
          // VERIFICA SI EXISTE UN SEGUNDO PARÁMETRO
          if (message[2] != undefined) {
            //EN EL CASO DE QUE EXISTA ORDENA LOS VALORES

            const date = params.sort()
            readCommands.readTotalDb(name, date, chatId, (response) => {
              bot.sendMessage(chatId, `${name} desde ${baseFunctions.parseDataToString(date[0])} hasta ${baseFunctions.parseDataToString(date[1])} llevas gastado:\n ${response}`);
            })
          } else {
            const date = baseFunctions.getDate(params[0]); //PARSEA LA FECHA
            readCommands.readTotalDb(name, date, chatId, (response) => {
              bot.sendMessage(chatId, name + " llevas gastado $" + response);

            });
          }
        }
      }
    },
    global: (context) => {
      const bot = context.bot;
      const message = context.message;
      const raw = context.raw;
      const chatId = context.chatID

      if (chatId == adminID) {
        let msj = raw.substr(7, raw.lenght);
        readCommands.readAndSendGlobalMsg((response) => { bot.sendMessage(response, msj) })
      } else {
        bot.sendMessage(chatId, "No tienes permisos suficientes para ejecutar este comando.")
      }

    }
  };
}

module.exports = commands