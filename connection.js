const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "bny.h.filess.io",
  user: "ujikom_battlepure",
  password: "61fa5eedd1667ef7914793e005494ceffdebeb53",
  database: "ujikom_battlepure",
  port: 3307,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Terkoneksi database");
});

module.exports = conn;
