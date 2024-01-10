const jwt = require("jsonwebtoken");
const config = require("../config/secret");

function verifikasi() {
  return function (req, res, next) {
    var { role } = req.body;
    console.log("role:", role);
    var tokenWithBearer = req.headers.authorization;
    console.log("token:", tokenWithBearer);
    if (tokenWithBearer) {
      var token = tokenWithBearer.split(" ")[1];
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return res
            .status(401)
            .send({ auth: false, message: "Token tidak terdaftar" });
        } else {
          if (role == 1) {
            req.auth = decoded;
            next();
          } else {
            return res
              .status(401)
              .send({ auth: false, message: "Gagal authorisasi role anda" });
          }
        }
      });
    } else {
      return res
        .status(401)
        .send({ auth: false, message: "Token tidak tersedia" });
    }
  };
}

module.exports = verifikasi;
