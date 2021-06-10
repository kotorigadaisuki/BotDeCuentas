const sqlite3 = require("sqlite3").verbose();

const readDB = (name, callback) => {
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

  db.all(`SELECT * FROM gastos WHERE nombre=?`, [name], (err, rows) => {
    if (err) {
      console.error("error en leer db:", err.message);
    }

    let gasto = 0;

    rows.forEach((row) => {
      gasto += parseInt(row.precio);
    });

    callback(gasto);
  });

  db.close((err) => {
    if (err) {
      console.error("error en cerrar db:", err.message);
    }
  });
};

module.exports = { readDB };
