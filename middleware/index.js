const express = require("express");
const auth = require("./auth");
const verifikasi = require("./verify");
const router = express.Router();

router.post("/api/register", auth.register);
router.post("/api/login", auth.login);

router.get("/api/secret", verifikasi(), auth.secretpage);

module.exports = router;
