const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const boardSchema = new Schema({
  id: String,
  title: String,
  description: String,
  idUser: String,
});

const boardModel = mongoose.model("board", boardSchema);

module.exports = boardModel;
