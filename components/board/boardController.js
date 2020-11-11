//import
const boardServices = require("./boardServices");

//controller
const GET_getAllBoard = async (req, res, next) => {
  const { id: idUser } = req.user;
  const boardsList = await boardServices.getAllBoard(idUser);

  res
    .status(200)
    .json({ success: true, message: "Get list boards success", boardsList });
};

const POST_createNewBoard = async (req, res, next) => {
  const { id: idUser } = req.user;
  const { title } = req.body;

  if (!title) {
    res
      .status(200)
      .json({ success: false, message: "Create new board failed" });
  } else {
    const newBoard = await boardServices.createNewBoard(idUser, title);
    res.status(200).json({
      success: true,
      message: "Create new board success",
      board: newBoard,
    });
  }
};

const GET_getBoardItems = async (req, res, next) => {
  const { id: idBoard } = req.params;
  const idUser = req.user.id;
  const boardItems = await boardServices.getBoardItems(idBoard, idUser);

  if (boardItems === null) {
    res.status(200).json({ success: false, message: "Board not found" });
  } else {
    res
      .status(200)
      .json({ success: true, message: "Get board items success", boardItems });
  }
};

const POST_addBoardItem = async (req, res, next) => {
  const { id: idBoard } = req.params;
  const item = req.body;
  const newItem = await boardServices.addBoardItem(idBoard, item);
  res.status(200).json({ success: true, message: "Add item success", newItem });
};

const POST_removeBoardItem = async (req, res, next) => {
  const { id: idBoard } = req.params;
  const item = req.body;
  const removeItemStatus = await boardServices.removeBoardItem(idBoard, item);

  if (removeItemStatus) {
    res.status(200).json({ success: true, message: "Remove item success" });
  } else {
    res.status(200).json({ success: false, message: "Remove item failed" });
  }
};

const POST_changeBoardItem = async (req, res, next) => {
  const { id: idBoard } = req.params;
  const item = req.body;
  const changeItemStatus = await boardServices.changeBoardItem(idBoard, item);

  if (changeItemStatus) {
    res.status(200).json({ success: true, message: "Change item success" });
  } else {
    res.status(200).json({ success: false, message: "Change item failed" });
  }
};

const POST_removeBoard = async (req, res, next) => {
  const { id: idBoard } = req.body;
  const removeBoardStatus = await boardServices.removeBoard(idBoard);

  if (removeBoardStatus) {
    res.status(200).json({ success: true, message: "Remove board success" });
  } else {
    res.status(200).json({ success: false, message: "Remove board failed" });
  }
};

const POST_changeBoard = async (req, res, next) => {
  const changeBoardStatus = await boardServices.changeBoard(req.body);

  if (changeBoardStatus) {
    res.status(200).json({ success: true, message: "Change board success" });
  } else {
    res.status(200).json({ success: false, message: "Change board failed" });
  }
};

const POST_shareBoard = async (req, res, next) => {
  const shareBoardStatus = await boardServices.shareBoard(req.body);

  if (shareBoardStatus) {
    res.status(200).json({ success: true, message: "Share board success" });
  } else {
    res.status(200).json({ success: false, message: "Share board failed" });
  }
};

module.exports = {
  GET_getAllBoard,
  POST_createNewBoard,
  GET_getBoardItems,
  POST_addBoardItem,
  POST_removeBoardItem,
  POST_removeBoard,
  POST_changeBoard,
  POST_changeBoardItem,
  POST_shareBoard,
};
