const connection = require("../connection");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const response = require("../res");
const jwt = require("jsonwebtoken");
const config = require("../config/secret");
const ip = require("ip");

// controller register
exports.register = function (req, res) {
  let { name, email, password, role } = req.body;
  const created_at = new Date();
  const updated_at = new Date();
  const saltRounds = 12;
  const passwordHash = bcrypt.hashSync(password, saltRounds);

  // cek email
  connection.query(
    "SELECT email FROM users WHERE email = ?",
    email,
    function (error, rows) {
      if (error) {
        console.log(error);
      } else {
        if (rows.length > 0) {
          // jika email terdaftar
          response.ok("Email telah terdaftar", res);
        } else {
          // jika email tidak terdaftar
          var post = {
            name,
            email,
            password: passwordHash,
            role,
            created_at,
            updated_at,
          };

          connection.query(
            "INSERT INTO users SET ?",
            post,
            function (error, rows) {
              if (error) {
                console.log(error);
              } else {
                response.ok("Akun Ditambahkan", res);
              }
            }
          );
        }
      }
    }
  );
};

//controller login
exports.login = function (req, res) {
  let { email, password } = req.body;

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    function (error, rows) {
      if (error) {
        console.log(error);
      } else {
        if (rows.length == 1) {
          const storedPasswordHash = rows[0].password;

          // Compare the provided password with the stored hashed password
          bcrypt.compare(password, storedPasswordHash, function (err, result) {
            if (result) {
              var token = jwt.sign({ rows }, config.secret, {
                expiresIn: 1440,
              });
              id_user = rows[0].id;
              username = rows[0].name;
              var data = {
                id_user: id_user,
                access_token: token,
                ip_address: ip.address(),
                created_at: new Date(),
                updated_at: new Date(),
              };
              connection.query(
                "INSERT INTO akses_token SET ?",
                data,
                function (error, rows) {
                  if (error) {
                    console.log(error);
                  } else {
                    res.json({
                      success: true,
                      message: "Token Generate",
                      token: token,
                      currUser: data.id_user,
                      user: username,
                    });
                  }
                }
              );
            } else {
              res.json({
                Error: true,
                Message: "Email atau password salah",
              });
            }
          });
        } else {
          res.json({
            Error: true,
            Message: "Email atau password salah",
          });
        }
      }
    }
  );
};

exports.secretpage = function (req, res) {  
  response.ok("Halaman hanya untuk role 1", res)
}