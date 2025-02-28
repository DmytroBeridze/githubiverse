const Role = require("./models/Role");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, secret, { expiresIn: "24h" });
};
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
      const hashPassword = bcrypt.hashSync(String(passWord), 7);

      // const userRole = await Role.findOne({ value: "ADMIN" });
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
      const { userName, passWord } = req.body;
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(400).json({ message: `User ${userName} not found` });
      }

      const validPassword = bcrypt.compareSync(passWord, user.passWord);
      if (!validPassword) {
        return res.status(400).json({ message: `Invalid password` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUser(req, res) {
    try {
      const users = await User.find();
      res.json(users);
      // const userRole = new Role();
      // const adminRole = new Role({ value: "ADMIN" });
      // await userRole.save();
      // await adminRole.save();
      res.json("Test json");
    } catch (error) {}
  }
}

module.exports = new AuthController();
