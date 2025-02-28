const { Router } = require("express");
const AuthController = require("./authController");
const { check } = require("express-validator");
const router = new Router();
// const authMiddleware = require("./middleware/authMiddleware.js");
const roleMiddleware = require("./middleware/roleMiddleware.js");

router.post("/login", AuthController.login);
router.post(
  "/register",
  [
    check("userName", "Invalid username").notEmpty(),
    check("passWord", "password too short").isLength({ min: 4 }),
  ],
  AuthController.registration
);
router.get("/users", roleMiddleware(["ADMIN"]), AuthController.getUser);

module.exports = router;
