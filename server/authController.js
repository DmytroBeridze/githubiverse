const Role = require("./models/Role");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

class AuthController {
  // ---------registration
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", errors });
      }
      const { userName, passWord } = req.body;
      const candidate = await User.findOne({ userName });
      if (candidate) {
        return res.status(400).json("User already exists");
      }
      const hashPassword = bcrypt.hashSync(passWord, 7);

      const userRole = await Role.findOne({ value: "USER" });

      const user = new User({
        userName,
        passWord: hashPassword,
        roles: [userRole.value],
      });

      await user.save();
      return res.json({ message: "User registered successfully" });
    } catch (error) {
      console.log(error);
      res.status(error).json({ message: "Registration error" });
    }
  }
  //--------- login
  async login(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUser(req, res) {
    try {
      // const userRole = new Role();
      // const adminRole = new Role({ value: "ADMIN" });
      // await userRole.save();
      // await adminRole.save();
      res.json("Test json");
    } catch (error) {}
  }
}

module.exports = new AuthController();
