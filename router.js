"use strict";

module.exports = function (app) {
  var jsonku = require("./controller");

  //User
  app.route("/api/User/get").get(jsonku.getuser);
  app.route("/api/Pegawai/get").get(jsonku.getpegawai);
  app.route("/api/Pegawai/get/:id").get(jsonku.getpegawaibyid);
  app.route("/api/Pegawai/create").post(jsonku.createpegawai);
  app.route("/api/Pegawai/update/:id").put(jsonku.updatepegawai);
  app.route("/api/Pegawai/delete/:id").delete(jsonku.deletepegawai);

  //Kendaraan
  app.route("/api/Kendaraan/get").get(jsonku.getkendaraan);
  app.route("/api/Kendaraan/get/:id_kendaraan").get(jsonku.getkendaraanbyid);
  app.route("/api/Kendaraan/create").post(jsonku.createkendaraan);
  app.route("/api/Kendaraan/update/:id_kendaraan").put(jsonku.updatekendaraan);
  app
    .route("/api/Kendaraan/delete/:id_kendaraan")
    .delete(jsonku.deletekendaraan);

  //Order
  app.route("/api/Order/get").get(jsonku.getorder);
  app.route("/api/Order/getSpesial").get(jsonku.getorderspecial);
  app.route("/api/Order/get/:id_order").get(jsonku.getorderbyid);
  app.route("/api/Order/updateStatus/:id_order").put(jsonku.updatestatusorder);

  //Transaksi
  app.route("/api/Transaksi/get").get(jsonku.gettransaksi);

  //Login
  app.route("/api/v1/login").post(jsonku.loginuser);
  app.route("/api/v2/login").post(jsonku.loginpegawai);

  //Mobile
  app.route("/api/Order/getMobile/:id_user").get(jsonku.getordermobileid);
};
