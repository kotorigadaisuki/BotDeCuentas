const sqlite3 = require("sqlite3").verbose();

const readDB = () => {
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
    `SELECT nombre AS nombre,
            precio AS precio,
            comentario AS comentario,
            fecha AS fecha
           FROM gastos`,
    (err, rows) => {
      let response;

      if (err) {
        console.error("error en leer db:", err.message);
      }
      response = rows.map(function (row) {
        return (
          row.precio +
          "\t" +
          row.comentario +
          "\t" +
          row.nombre +
          "\t" +
          row.fecha +
          "\n"
        );
      });
      console.log(response.join().toString());
    }
  );

  db.close((err) => {
    if (err) {
      console.error("error en cerrar db:", err.message);
    }
  });
};

module.exports = { readDB };
