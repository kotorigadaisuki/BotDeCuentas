const TelegramBot = require("node-telegram-bot-api");
const Token = require("./token");
const readCommands = require("./readFunctions");
const writeCommands = require("./writeFunctions");

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(Token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/g (.+)/, (msg, match) => {
  // RECIBO EL MENSAJE DE TELEGRAM
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const message = match[1].toLocaleLowerCase(); //GUARDO EL MENSAJE EN BRUTO
  const slice = message.indexOf(" "); //LEO EL INDICE DEL PRIMER ESPACIO
  const cost = message.substr(0, slice); //IDENTIFICO LA PRIMER PARTE DEL MENSAJE Y GUARDO
  const description = message.substr(slice, message.length); //IDENTIFICO LA SEGUNDA PARTE DEL MENSAJE Y GUARDO
  const name = msg.chat.first_name;

  if (message == "list") {
    readCommands.readDB().then(() => {
      // bot.sendMessage(chatId, response);
    });
  } else if (cost.match(/([0-9])/)) {
    writeCommands.writeData(cost, description, name);
  } else {
    bot.sendMessage(chatId, "Comando inválido");
  }
});
