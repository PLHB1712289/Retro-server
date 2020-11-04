const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  password: String,
  email: String,
  fullName: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
