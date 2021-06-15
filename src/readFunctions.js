const sqlite3 = require("sqlite3").verbose();
const moment = require("moment");

const readTotalDb = (name, date, id, sendMessage) => {
  //lectura completa a la db
  let db = new sqlite3.Database(
    "./src/gastos.sqlite3",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.error("error en crear db:", err.message);
      }
    }
  );

  db.all(
    `SELECT * FROM gastos WHERE nombre=? AND id_grupo=?`,
    [name, id],
    (err, rows) => {
      if (err) {
        console.error("error en leer db:", err.message);
      }

      let gasto = 0;
      if (date[1] == 0) {
        //EN EL CASO DE QUE NO TENGA SEGUNDO PARÁMETRO
        const dateEnd = moment().format("YYYY-MM-DD HH:mm:ss.SSSSSS"); //FECHA DE HOY
        rows.forEach((row) => {
          if (moment(row.fecha).isBetween(date, dateEnd)) {
            //SOLO SUMA LOS GASTOS DE LOS DÍAS QUE ESTEN ENTRE EL PARÁMETRO Y HOY
            gasto += parseInt(row.precio);
          }
        });
      } else {
        rows.forEach((row) => {
          //EN EL CASO DE QUE TENGA 2 PARÁMETROS
          if (moment(row.fecha).isBetween(date[0], date[1])) {
            //SUMA LAS FECHAS QUE ESTÁN ENTRE LOS DOS PARÁMETROS
            gasto += parseInt(row.precio);
          }
        });
      }

      sendMessage(gasto);
    }
  );

  db.close((err) => {
    if (err) {
      console.error("error en cerrar db:", err.message);
    }
  });
};

const readPartialDb = (name, date, id, sendMessage) => {
  //lectura completa a la db
  let db = new sqlite3.Database(
    "./src/gastos.sqlite3",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.error("error en crear db:", err.message);
      }
    }
  );

  db.all(
    `SELECT * FROM gastos WHERE nombre=? AND id_grupo=?`,
    [name, id],
    (err, rows) => {
      if (err) {
        console.error("error en leer db:", err.message);
      }

      let listaGasto = "";
      let gasto=0;
      if (date[1] == 0) {
        //EN EL CASO DE QUE NO TENGA SEGUNDO PARÁMETRO
        const dateEnd = moment().format("YYYY-MM-DD HH:mm:ss.SSSSSS"); //FECHA DE HOY
        rows.forEach((row) => {
          if (moment(row.fecha).isBetween(date, dateEnd)) {
            //SOLO SUMA LOS GASTOS DE LOS DÍAS QUE ESTEN ENTRE EL PARÁMETRO Y HOY
            listaGasto += `$${row.precio} - ${row.comentario}\n`;
            gasto += row.precio;
          }
        });
      } else {
        rows.forEach((row) => {
          //EN EL CASO DE QUE TENGA 2 PARÁMETROS
          if (moment(row.fecha).isBetween(date[0], date[1])) {
            //SUMA LAS FECHAS QUE ESTÁN ENTRE LOS DOS PARÁMETROS
            listaGasto += `$${row.precio} - ${row.comentario}\n`
            gasto += row.precio;
          }
        });
      }
      let ListaCompleta = listaGasto + "\nTotal: $"+gasto
      sendMessage(ListaCompleta);
    }
  );

  db.close((err) => {
    if (err) {
      console.error("error en cerrar db:", err.message);
    }
  });
};


module.exports = { readTotalDb,readPartialDb };
