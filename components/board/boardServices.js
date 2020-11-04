const boardModel = require("../../database/schema/board");
const itemModel = require("../../database/schema/item");

const getAllBoard = async (idUser) => {
  console.log("get board ", idUser);
  return await boardModel.find({ idUser });
};

const createNewBoard = async (idUser, title, description) => {
  console.log("create new board ", idUser);
  const newBoard = new boardModel({ idUser, title, description });
  newBoard.save();
  return newBoard;
};

const getBoardItems = async (idBoard) => {
  console.log("get board items", idBoard);

  const { title, description } = await boardModel.findOne({ _id: idBoard });
  const listItems = await itemModel.find({ idBoard });
  return { title, description, listItems };
};

const postBoardAddItem = async (idBoard, item) => {
  console.log("post board add item ", idBoard);
  const { content, tag } = item;
  const newItem = new itemModel({ idBoard, content, tag });
  newItem.save();
  return newItem;
};

const postBoardRemoveItem = async (idBoard, item) => {
  console.log("post board remove item ", idBoard);
  const { id } = item;

  return await itemModel.remove({ _id: id });
};

const postRemoveBoard = async (idBoard) => {
  console.log("post board remove board ", idBoard);

  await itemModel.remove({ idBoard: idBoard });

  return await boardModel.remove({ _id: idBoard });
};

module.exports = {
  getAllBoard,
  getBoardItems,
  postBoardAddItem,
  createNewBoard,
  postBoardRemoveItem,
  postRemoveBoard,
};
