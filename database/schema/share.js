const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const shareSchema = new Schema({
  idBoard: String,
  idSharers: String,
  idSharedPerson: String,
});

const shareModel = mongoose.model("share", shareSchema);

module.exports = shareModel;
