const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12675971",
  password: "KnpCtHbtJv",
  database: "sql12675971",
  port: 3306,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Terkoneksi database");
});

module.exports = conn;
