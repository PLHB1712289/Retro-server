const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const boardSchema = new Schema({
  title: String,
  dateCreate: Number,
  idUser: String,
  shareWith: Number,
});

const boardModel = mongoose.model("board", boardSchema);

module.exports = boardModel;
