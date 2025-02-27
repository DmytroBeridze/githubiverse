const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const Role = new Schema({
  value: { type: String, unique: true, default: "USER" },
});

module.exports = model("Role", Role);
