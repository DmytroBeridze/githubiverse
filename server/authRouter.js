const express = require("express");
const {
  body,
  validationResult,
  checkSchema,
  check,
} = require("express-validator");
const router = express.Router();
const verifyToken = require("./middlewares/verifyToken");

const { registration, login, getUsers } = require("./authController");

// router.post(
//   "/register",
//   checkSchema({
//     userName: {
//       notEmpty: {
//         errorMessage: "Username is required",
//       },
//     },
//     pass: {
//       notEmpty: {
//         errorMessage: "Password is required",
//       },
//       isLength: {
//         options: { min: 3 },
//         errorMessage: "Password should be at least 3 chars",
//       },
//     },
//   }),
//   registration
// );

router.post(
  "/register",
  [
    check("userName", "Username is required").notEmpty(),
    check("pass", "Password should be at least 3 chars").isLength({ min: 3 }),
  ],
  registration
);

router.post("/login", login);
router.get("/users", verifyToken, getUsers);

module.exports = router;
