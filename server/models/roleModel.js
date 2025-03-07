const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const roleSchema = new Schema({
  value: { type: String, unic: true, default: "USER" },
});

module.exports = model("Role", roleSchema);
