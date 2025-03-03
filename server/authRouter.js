const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { registration } = require("./authController");

router.post("/register", registration);

module.exports = router;
