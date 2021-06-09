const sqlite3 = require("sqlite3").verbose();
const moment = require("moment");

const writeData = (cost, description, name) => {
  let db = new sqlite3.Database(
    "./src/gastos.sqlite3",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.error("error en crear db:", err.message);
      }
    }
  );

  const date = moment().format("YYYY-MM-DD HH:mm:ss.SSSSSS");

  let data = [name, cost, description, date];

  db.run(`INSERT INTO gastos VALUES (? , ? , ? ,?)`, data, (err) => {
    if (err) {
      console.error("error en leer db:", err.message);
    }
  });

  db.close((err) => {
    if (err) {
      console.error("error en cerrar db:", err.message);
    }
  });
};

module.exports = { writeData };
