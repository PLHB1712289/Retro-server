const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const itemSchema = new Schema({
  idBoard: String,
  content: String,
  tag: Number,
});

const itemModel = mongoose.model("item", itemSchema);

module.exports = itemModel;
