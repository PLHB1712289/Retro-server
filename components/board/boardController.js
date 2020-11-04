//import
const boardModel = require("../../database/schema/board");
const boardServices = require("./boardServices");

//controller
const getBoard = async (req, res, next) => {
  const { id: idUser } = req.user;

  const board = await boardServices.getAllBoard(idUser);
  res.send(board);
};

const createNewBoard = async (req, res, next) => {
  const { id: idUser } = req.user;
  const { title, description } = req.body;
  if (!title || !description) {
    res.statusCode = "400";
    res.send("Failed");
  }

  const board = await boardServices.createNewBoard(idUser, title, description);
  res.send(board);
};

const getBoardItems = async (req, res, next) => {
  const { id: idBoard } = req.params;
  console.log(idBoard);

  const board = await boardServices.getBoardItems(idBoard);
  res.send(board);
};

const postBoardAddItem = async (req, res, next) => {
  const { id: idBoard } = req.params;
  const item = req.body;
  console.log(idBoard);

  const board = await boardServices.postBoardAddItem(idBoard, item);
  res.send(board);
};

const postBoardRemoveItem = async (req, res, next) => {
  const { id: idBoard } = req.params;
  const item = req.body;
  const board = await boardServices.postBoardRemoveItem(idBoard, item);
  res.send(board);
};

const postRemoveBoard = async (req, res, next) => {
  const { id: idBoard } = req.body;
  const board = await boardServices.postRemoveBoard(idBoard);
  res.send(board);
};

module.exports = {
  getBoard,
  createNewBoard,
  getBoardItems,
  postBoardAddItem,
  postBoardRemoveItem,
  postRemoveBoard,
};
