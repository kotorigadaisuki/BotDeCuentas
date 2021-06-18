const TelegramBot = require("node-telegram-bot-api");
const Token = require("./token");
const writeCommands = require("./writeFunctions");

const commands = require("./commands")

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(Token, { polling: true });

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
      console.log("Entra al comando")
      const context = {
        "chatID": chatId,
        "message": message,
        "user": msg.from,
        "bot": bot,
      }
      cmd[message[0]](context)

    } else {
      bot.sendMessage(chatId, "Comando inválido");
    }


  }
})

// MSG
// RESPUESTA EN CHAT PRIVADO
// msg { message_id: 307,
//   from:
//    { id: 479543501,
//      is_bot: false,
//      first_name: 'Alejandro',
//      username: 'Piuma14',
//      language_code: 'en' },
//   chat:
//    { id: 479543501,
//      first_name: 'Alejandro',
//      username: 'Piuma14',
//      type: 'private' },
//   date: 1623332602,
//   text: '/g list',
//   entities: [ { offset: 0, length: 2, type: 'bot_command' } ] }

// RESPUESTA EN UN CHAT DE GRUPO
// msg { message_id: 309,
//   from:
//    { id: 479543501,
//      is_bot: false,
//      first_name: 'Alejandro',
//      username: 'Piuma14',
//      language_code: 'en' },
//   chat:
//    { id: -548657141,
//      title: 'test group',
//      type: 'group',
//      all_members_are_administrators: true },
//   date: 1623332645,
//   text: '/g list',
//   entities: [ { offset: 0, length: 2, type: 'bot_command' } ] }

// GETCHAT
// respuesta en un chat privado
// resp { id: 479543501,
//        first_name: 'Alejandro',
//        username: 'Piuma14',
//        type: 'private',
//        bio: 'alejandropiumetti.com.ar | alepiumetti.github.io',
//        photo:
//        { small_file_id:
//          'AQADAQADrqcxG81AlRwACP1osEsXAAMCAAPNQJUcAATH4FP_65HoTDg_AAIfBA',
//          small_file_unique_id: 'AQAD_WiwSxcAAzg_AAI',
//          big_file_id:
//          'AQADAQADrqcxG81AlRwACP1osEsXAAMDAAPNQJUcAATH4FP_65HoTDo_AAIfBA',
//          big_file_unique_id: 'AQAD_WiwSxcAAzo_AAI' } }

//      respuesta en un chat de grupo

// resp { id: -548657141,
//       title: 'test group',
//       type: 'group',
//       permissions:
//        { can_send_messages: true,
//          can_send_media_messages: true,
//          can_send_polls: true,
//          can_send_other_messages: true,
//          can_add_web_page_previews: true,
//          can_change_info: true,
//          can_invite_users: true,
//          can_pin_messages: true },
//       all_members_are_administrators: true }
