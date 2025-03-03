const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const verifyToken = require("./middlewares/verifyToken");

const { registration, login, getUsers } = require("./authController");

router.post("/register", registration);
router.post("/login", login);
router.get("/users", verifyToken, getUsers);

module.exports = router;
