const boardModel = require("../../database/schema/board");

const getAllBoard = async () => {
  return await boardModel.find({});
};

module.exports = { getAllBoard };
