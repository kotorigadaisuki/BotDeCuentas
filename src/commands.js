const baseFunctions = require("./baseFunctions");
const readCommands = require("./readFunctions");


const commands = () => {
  return {
    help: (context) => {
      const msg = "*Ayuda:*\n /g list parametros \n /g total parametros";
      context.bot.sendMessage(context.chatID, msg, { parse_mode: "Markdown" })
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
  };
}

module.exports = commands