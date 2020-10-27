const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  id: String,
  username: String,
  password: String,
  email: String,
  fullName: String,
  phoneNumber: String,
  dob: Date,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
