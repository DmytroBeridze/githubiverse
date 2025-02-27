const { Router } = require("express");
const AuthController = require("./authController");
const { check } = require("express-validator");

const router = new Router();

router.post("/login", AuthController.login);
router.post(
  "/register",
  [
    check("userName", "Invalid username").notEmpty(),
    check("passWord", "password too short").isLength({ min: 4 }),
  ],
  AuthController.registration
);
router.get("/users", AuthController.getUser);

module.exports = router;
