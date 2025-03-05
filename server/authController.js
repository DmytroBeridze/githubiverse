const User = require("./models/userModel");
const Role = require("./models/roleModel");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(7);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

const { validationResult } = require("express-validator");
// registration
const registration = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ message: result.array()[0].msg });
      // return res.status(400).json({ errors: result.array() });
    }

    const { userName, pass } = req.body;

    const role = await Role.findOne({ value: "USER" });

    if (!role) {
      return res.status(400).json({ message: "No role" });
    }
    const candidate = await User.findOne({ userName });
    if (candidate) {
      return res.status(409).json({ message: "Such user exist" });
    }

    const hashPass = bcrypt.hashSync(String(pass), salt);
    const newUser = new User({
      userName,
      pass: hashPass,
      role: role.value,
    });

    await newUser.save();
    return res
      .status(200)
      .json({ message: "User successfully registered", payload: userName });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Registration error" });
  }
};

// login;
const login = async (req, res) => {
  try {
    const { userName, pass } = req.body;

    const candidate = await User.findOne({ userName });
    if (!candidate) {
      return res.status(400).json({ message: `User ${userName} not found` });
    }

    const comparePass = bcrypt.compareSync(pass, candidate.pass);

    if (!comparePass) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: candidate._id }, secretKey, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: `User ${userName} logged`, token });
  } catch (error) {
    return res.status(500).json({ message: "Error during login" });
  }
};

// get
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
module.exports = { registration, login, getUsers };
