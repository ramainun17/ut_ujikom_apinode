"use strict";
const bcrypt = require("bcrypt");
var response = require("./res");
const connection = require("./connection");

//get pegawai
exports.getpegawai = function (req, res) {
  connection.query("SELECT * FROM pegawais", function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
//get user
exports.getuser = function (req, res) {
  connection.query("SELECT * FROM users", function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
//get pegawai berdasarkan id
exports.getpegawaibyid = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM pegawais WHERE id = ?",
    [id],
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};
//create pegawai
exports.createpegawai = function (req, res) {
  let { name, email, password, role } = req.body;
  const newData = { name, email, password, role };
  connection.query(
    "INSERT INTO pegawais SET ?",
    newData,
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data tersimpan", res);
      }
    }
  );
};
//update pegawai berdasarkan id
exports.updatepegawai = function (req, res) {
  let id = req.params.id;
  let { name, email, password, role } = req.body;

  const updatedData = { name, email, password, role };

  connection.query(
    "UPDATE pegawais SET ? WHERE id = ?",
    [updatedData, id],
    function (error, rows, fileds) {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Data terupdate" });
      }
    }
  );
};
//delete pegawai berdasarkan id
exports.deletepegawai = function (req, res) {
  let id = req.params.id;
  connection.query(
    "DELETE FROM pegawais WHERE id = ?",
    [id],
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data terhapus", res);
      }
    }
  );
};

//get kendaraan
exports.getkendaraan = function (req, res) {
  connection.query("SELECT * FROM kendaraans", function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
//get kendaraan berdasarkan id
exports.getkendaraanbyid = function (req, res) {
  let id_kendaraan = req.params.id_kendaraan;
  connection.query(
    "SELECT * FROM kendaraans WHERE id_kendaraan = ?",
    [id_kendaraan],
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};
//create kendaraan
exports.createkendaraan = function (req, res) {
  let { tipe_kendaraan, status } = req.body;
  const created_at = new Date();
  const updated_at = new Date();
  const newData = { tipe_kendaraan, status, created_at, updated_at };
  connection.query(
    "INSERT INTO kendaraans SET ?",
    newData,
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data tersimpan", res);
      }
    }
  );
};
//update kendaraan berdasarkan id
exports.updatekendaraan = function (req, res) {
  let { tipe_kendaraan, status } = req.body;
  let id_kendaraan = req.params.id_kendaraan;
  const updated_at = new Date();
  const updatedData = { tipe_kendaraan, status, updated_at };
  connection.query(
    "UPDATE kendaraans SET ? WHERE id_kendaraan = ?",
    [updatedData, id_kendaraan],
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data terupdate", res);
      }
    }
  );
};
//delete kendaraan berdasarkan id
exports.deletekendaraan = function (req, res) {
  let id_kendaraan = req.params.id_kendaraan;
  connection.query(
    "DELETE FROM kendaraans WHERE id_kendaraan = ?",
    [id_kendaraan],
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data terhapus", res);
      }
    }
  );
};

//get all order
exports.getorder = function (req, res) {
  connection.query("SELECT * FROM orders", function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
//get id, name, telp, layanan, order
exports.getorderspecial = function (req, res) {
  connection.query(
    "SELECT orders.id_order, users.name, orders.nomor_telpon, layanans.nama_layanan, orders.status FROM orders JOIN layanans ON orders.id_layanan = layanans.id_layanan JOIN users ON orders.id_user = users.id;",
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};
//get kendaraan berdasarkan id
exports.getorderbyid = function (req, res) {
  let id_order = req.params.id_order;
  connection.query(
    "SELECT id_order, kendaraans.tipe_kendaraan, nomor_mesin, nomor_polisi, seri_kendaraan, users.name, nomor_telpon, layanans.nama_layanan, tgl_booking, alamat, orders.status, teknisi FROM orders JOIN layanans ON orders.id_layanan = layanans.id_layanan JOIN users ON orders.id_user = users.id JOIN kendaraans ON orders.id_kendaraan = kendaraans.id_kendaraan WHERE id_order = ?",
    [id_order],
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};
//update status order
exports.updatestatusorder = function (req, res) {
  let { status, teknisi } = req.body;
  let id_order = req.params.id_order;
  const updated_at = new Date();
  const updatedData = { status, teknisi, updated_at };
  connection.query(
    "UPDATE orders SET ? WHERE id_order = ?",
    [updatedData, id_order],
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data terupdate", res);
      }
    }
  );
};

//get all transaksi
exports.gettransaksi = function (req, res) {
  connection.query("SELECT * FROM transaksis", function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//create loginuser
exports.loginuser = function (req, res) {
  let { email } = req.body;
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    email,
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};
//create login
exports.login = function (req, res) {
  let { email, password } = req.body;
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    email,
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        const user = rows[0];
        const passdb = user.password;
        const passwordHash = passdb.replace(/^\$2y(.+)$/i, "$2a$1");
        bcrypt.compare(password, passwordHash, (err, result) => {
          if (err) {
            console.log(error);
          }
          if(result){
            response.ok(rows, res);
          } else{
            return res
              .status(500)
              .json({ message: "Password salah, coba lagi" });
          }
        });
      }
    }
  );
};
//create loginpegawai
exports.loginpegawai = function (req, res) {
  let { email, password } = req.body;
  connection.query(
    "SELECT * FROM pegawais WHERE email = ? AND password = ?",
    [email, password],
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        if (rows.length === 0) {
          // No data found
          res.status(404).json({ message: "Data tidak ditemukan" });
        } else {
          // Data found, send the response
          response.ok(rows, res);
        }
      }
    }
  );
};
//get order mobile
exports.getordermobileid = function (req, res) {
  let id_user = req.params.id_user;
  connection.query(
    "SELECT id_order, kendaraans.tipe_kendaraan, nomor_mesin, nomor_polisi, seri_kendaraan, users.name, nomor_telpon, layanans.nama_layanan, tgl_booking, alamat, orders.status, teknisi FROM orders JOIN kendaraans ON orders.id_kendaraan = kendaraans.id_kendaraan JOIN users ON orders.id_user = users.id JOIN layanans ON orders.id_layanan = layanans.id_layanan WHERE id_user = ?",
    [id_user],
    function (error, rows, fileds) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};
