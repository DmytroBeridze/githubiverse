const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  role: [{ type: String, ref: "Role" }],
});

module.exports = model("User", userSchema);
