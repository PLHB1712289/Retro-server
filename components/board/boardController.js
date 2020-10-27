//import
const boardServices = require("./boardServices");

//controller
const getBoard = async (req, res, next) => {
  const board = await boardServices.getAllBoard();
  res.send(board);
};

module.exports = { getBoard };
