const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const User = new Schema({
  userName: { type: String, unique: true, required: true },
  passWord: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  //   roles: [{ type: String, ref: "Role" }],
});

module.exports = model("User", User);
