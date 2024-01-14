"use strict";
const bcrypt = require("bcrypt");
const axios = require("axios");

module.exports = function (app) {
  var jsonku = require("./controller");

  //User
  app.route("/api/User/get").get(jsonku.getuser);
  app.route("/api/Pegawai/get").get(jsonku.getpegawai);
  app.route("/api/User/get/:id").get(jsonku.getuserbyid);
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
  app.route("/api/User/updateToken/:id").put(jsonku.updatetoken);

  //Transaksi
  app.route("/api/Transaksi/get").get(jsonku.gettransaksi);

  //Login
  app.route("/api/v1/login").post(jsonku.loginuser);
  app.route("/api/v2/login").post(jsonku.loginpegawai);
  app.route("/api/v3/login").post(jsonku.login);

  //Mobile
  app.route("/api/Order/getMobile/:id_user").get(jsonku.getordermobileid);

  //uji coba
  app.post("/cekPasswordHash", (req, res) => {
    const { password, hash } = req.body;
    const passwordHash = hash.replace(/^\$2y(.+)$/i, "$2a$1");

    bcrypt.compare(password, passwordHash, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "error anj" });
      }

      if (result) {
        return res.json({ success: true, message: "password cocok" });
      } else {
        return res.status(401).json({ error: "password tak cocok" });
      }
    });
  });
  app.post("/send-notification", async (req, res) => {
    try {
      const { id } = req.body;

      // Mengambil token pengguna berdasarkan ID
      const response = await axios.get(
        `http://localhost:3000/api/User/get/${id}`
      );
      const userData = response.data.data[0];
      console.log(userData.remember_token);

      const { remember_token } = userData.remember_token;

      const notification = {
        title: 'Updated Status',
        message: 'Pesanan anda telah terupdate',
      };

      await sendNotification(remember_token, notification);

      res.status(200).send('Notification sent successfully');
      
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  async function sendNotification(token, { title, message }) {
    // Ganti URL dengan endpoint Firebase Cloud Messaging (FCM) server
    const fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';
  
    // Ganti dengan server key yang valid dari Firebase Console
    const serverKey = 'AAAAfl8AKWU:APA91bGI2DJrX9B9g5FL1JyPNVO7dz-sEYMX8XCdmJoArh75v234YJfd_VRVd0Rd51xfuIqrF-YCsgh2AzGOqlE4R4G3zVhT9kPJ39L7bG8X2LbBs5HtNY3937ztOTaJrIZ2vWe7LnOh';
  
    // Ganti dengan sender ID yang valid dari Firebase Console
    const senderId = '542759725413';
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `key=${serverKey}`,
    };
  
    const data = {
      to: token,
      notification: {
        title,
        body: message,
      },
    };
  
    await axios.post(fcmEndpoint, data, { headers });
  }
  
};
