const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6680712",
  password: "vslvHp2q77",
  database: "sql6680712",
  port: 3306,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Terkoneksi database");
});

module.exports = conn;
