const boardModel = require("../../database/schema/board");
const itemModel = require("../../database/schema/item");
const shareModel = require("../../database/schema/share");
const userModel = require("../../database/schema/user");

const getAllBoard = async (idUser) => {
  const myBoards = await boardModel.find({ idUser });

  const listIDBoard = await shareModel.find({ idSharedPerson: idUser });

  const shareBoards = [];

  for (let i = 0; i < listIDBoard.length; i++) {
    const board = await boardModel.findOne({ _id: listIDBoard[i].idBoard });
    shareBoards.push(board);
  }

  return { myBoards, shareBoards };
};

const createNewBoard = async (idUser, title) => {
  const dateCreate = new Date().getTime();

  const newBoard = new boardModel({ idUser, title, dateCreate, shareWith: 0 });
  newBoard.save();
  return newBoard;
};

const getBoardItems = async (idBoard, idUser) => {
  try {
    const board = await boardModel.findOne({
      _id: idBoard,
    });

    if (!board) return null;

    const isExistShare = await shareModel.findOne({
      idBoard,
      idSharedPerson: idUser,
    });

    if (board.idUser === idUser || isExistShare) {
      const { title, description } = board;
      const listItems = await itemModel.find({ idBoard });
      return { title, description, listItems };
    }

    return null;
  } catch (e) {
    return null;
  }
};

const addBoardItem = async (idBoard, item) => {
  const { content, tag } = item;
  const newItem = new itemModel({ idBoard, content, tag });
  newItem.save();
  return newItem;
};

const removeBoardItem = async (idBoard, item) => {
  const { id } = item;

  const { deletedCount } = await itemModel.remove({ _id: id });

  if (deletedCount === 0) return false;
  return true;
};

const changeBoardItem = async (idBoard, item) => {
  const { id, content } = item;

  const filter = { _id: id, idBoard };
  const update = { content };

  try {
    const doc = await itemModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (doc) return true;

    return false;
  } catch (e) {
    return false;
  }
};

const removeBoard = async (idBoard) => {
  await itemModel.remove({ idBoard: idBoard });
  await shareModel.remove({ idBoard: idBoard });

  const { deletedCount } = await boardModel.remove({ _id: idBoard });

  if (deletedCount === 0) return false;
  return true;
};

const changeBoard = async (board) => {
  const { id, title } = board;

  const filter = { _id: id };
  const update = { title };

  try {
    const doc = await boardModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (doc) return true;

    return false;
  } catch (e) {
    return false;
  }
};

const shareBoard = async ({ id, email }) => {
  const filter = { _id: id };

  try {
    const board = await boardModel.findOne(filter);
    if (!board) return false;

    const user = await userModel.findOne({ email: email });

    if (!user) return false;

    if (JSON.stringify(board.idUser) === JSON.stringify(user._id)) {
      return false;
    }

    console.log("idUser ", idUser);
    console.log("_id ", user._id);

    const query = {
      idBoard: id,
      idSharers: board.idUser,
      idSharedPerson: user._id,
    };

    // Find the document
    if (!(await shareModel.findOne(query))) {
      const newShare = new shareModel(query);
      await newShare.save();
      board.shareWith = board.shareWith + 1;
      await board.save();
      return true;
    }

    return false;
  } catch (e) {
    console.log("error");
    return false;
  }
};

module.exports = {
  getAllBoard,
  getBoardItems,
  addBoardItem,
  createNewBoard,
  removeBoardItem,
  removeBoard,
  changeBoardItem,
  changeBoard,
  shareBoard,
};
