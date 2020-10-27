const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const itemSchema = new Schema({
  id: String,
  idBoard: String,
  wentWell: String,
  toImporve: String,
  actionItems: String,
});

const itemModel = mongoose.model("item", itemSchema);

module.exports = itemModel;
