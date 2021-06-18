const TelegramBot = require("node-telegram-bot-api");
const Token = require("./token");
const writeCommands = require("./writeFunctions");

const commands = require("./commands")

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(Token, { polling: true });

bot.onText(/\/start/, function (msg) {


  var chatId = msg.chat.id;
  var chatitle = msg.chat.title;

  bot.sendMessage(chatId, `Hola ${msg.from.first_name}! \n Me alegra que quieras comenzar a acomodar tus cuentas. \nYo soy Apolo y te voy a ayudar a controlar tus gastos.\nPodés comenzar escribiendo */g help* o apretando en el abajo.\n\nPodés comenzar cargando tus gastos /g número descripción.`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "⚙️ Ayuda", callback_data: "botonAyuda" },
          { text: "🐶 Sobre Apolo", callback_data: "botonSobre" }

        ]
      ]

    }, parse_mode: "Markdown"
  })


});

bot.on('callback_query', function onCallbackQuery(actionButton) {
  const cmd = commands();
  const data = actionButton.data;
  const msg = actionButton.message;


  const context = {
    "chatID": actionButton.message.chat.id,
    "bot": bot,
  }

  if (data == "botonAyuda") {
    cmd.help(context)
  }
  if (data == "botonSobre") {
    cmd.about(context)
  }
  if (data == "botonRepositorio") {

  }
})

// Matches "/echo [whatever]"
bot.onText(/\/g (.+)/, (msg, match) => {
  // RECIBO EL MENSAJE DE TELEGRAM
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  const message = match[1].toLowerCase().split(" "); //GUARDO EL MENSAJE EN FORMA DE ARRAY
  // GUUARDO EL NOMBRE EN VARIABLE
  const name = msg.from.first_name;


  const cmd = commands();


  //CONDICIONAL SI EL MENSAJE TIENE 3 O MENOS ELEMENTOS
  if (message[0].match(/^([0-9]+)$/)) {
    // SI LA PRIMERA PARTE DEL MENSAJE TIENE UN GRUPO DE NUMEROS
    //ENTONCES ES UN GASTO

    console.log("entra a funcion para escribir");
    writeCommands.writeData(
      message[0],
      message[1],
      name,
      chatId,
      (response) => {
        if (response) {
          //SE ENVIA EL GASTO A LA DB Y RESPONDE SI SE GUARDÓ O NO
          bot.sendMessage(chatId, "Se ha cargado el gasto correctamente.");
        } else {
          bot.sendMessage(chatId, "No se pudo cargar el gasto.");
        }
      }
    );
  } else {
    if (cmd[message[0]]) {
      const context = {
        "chatID": chatId,
        "message": message,
        "user": msg.from,
        "bot": bot,
        "raw": match[1],
      }
      cmd[message[0]](context)

    } else {
      bot.sendMessage(chatId, "Comando inválido");
    }


  }
})