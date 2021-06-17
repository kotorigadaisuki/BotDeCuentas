const baseFunctions = require("./baseFunctions");
const readCommands = require("./readFunctions");


const commands = () => {
  return {
    help: (context) => {
      context.bot.sendMessage(context.chatID, "test")
    },
    list: (context) => {
      const bot = context.bot;
      const message = context.message;
      const chatId = context.chatID;
      const user = context.user;
      const name = user.first_name
      if ( //EN EL CASO DE QUE EL COMANDO SEA /g list
        message[0] == "list" &&
        message[1] != undefined &&
        parseInt(message[1]) >= 1 &&
        parseInt(message[1]) <= 12
      ) {
        if (message[2] != undefined && parseInt(message[2]) >= 1 && parseInt(message[2]) <= 12) {
          const startDate = baseFunctions.getDate(message[1]); //PARSEA LA FECHA
          const endDate = baseFunctions.getDate([message[2]]);
          readCommands.readPartialDb(name, [startDate, endDate], chatId, (response) => {
            bot.sendMessage(chatId, `${name} tu lista de gastos desde ${baseFunctions.parseDataToString(message[1])} hasta ${baseFunctions.parseDataToString(message[2])} es:\n ${response}`);
          });
        } else {
          const date = baseFunctions.getDate(message[1]); //PARSEA LA FECHA
          readCommands.readPartialDb(name, date, chatId, (response) => {
            bot.sendMessage(chatId, `${name} tu lista de gastos desde ${baseFunctions.parseDataToString(message[1])} hasta hoy es:\n ${response}`);
          })
        }
      }
    },
    total: (context) => {

      const bot = context.bot;
      const message = context.message;
      const chatId = context.chatID;
      const user = context.user;
      const name = user.first_name
      if ( // EN EL CASO DE QUE EL COMANDO SEA /g total
        message[0] == "total" &&
        message[1] != undefined &&
        parseInt(message[1]) >= 1 &&
        parseInt(message[1]) <= 12
      ) {
        if (message[2] != undefined && parseInt(message[2]) >= 1 && parseInt(message[2]) <= 12) { //EN EL CASO DE QUE LA TERCERA PARTE DEL MENSAJE ESTÉ DEFINIDA Y SEA UN NRO ENTRE 1 Y 12
          const startDate = baseFunctions.getDate(message[1]); //PARSEA LA FECHA DE COMIENZO
          const endDate = baseFunctions.getDate([message[2]]); //PARSEA LA FECHA DE FINAL
          readCommands.readTotalDb(name, [startDate, endDate], chatId, (response) => { //ENVIA PETICION A LA BASE DE DATOS CON EL SENDMESSAGE COMO CALLBACK
            bot.sendMessage(chatId, name + " llevas gastado $" + response);
          });
        } else {
          const date = baseFunctions.getDate(message[1]); //PARSEA LA FECHA
          readCommands.readTotalDb(name, date, chatId, (response) => {
            bot.sendMessage(chatId, name + " llevas gastado $" + response);
          });
        }

      }
    },
  };
}

module.exports = commands


     // if (message[1].match(/([0-9])/) || message[2].match(/([0-9])/)) {
  //EN EL CASO DE QUE LA PRIMERA O LA SEGUNDA PARTE DEL MENSAJE SEA UN NRO
