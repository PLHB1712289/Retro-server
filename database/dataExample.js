const boardModel = require("./schema/board");
const userModel = require("./schema/user");
const itemModel = require("./schema/item");

const { TAG_ITEM_BOARD } = require("./flagResources");

if (process.env.CREATE_DATA_EXAMPLE == "true") {
  console.log("create data example");

  const newUser = new userModel({
    username: "User1",
    password: "userpassword",
    email: "user.email.@gmail.com",
    fullName: "user's fullname",
    phoneNumber: "123456789",
    dob: new Date(),
  });
  newUser.save();

  const newBoard = new boardModel({
    title: "board title",
    description: "board description",
    idUser: `${newUser._id}`,
  });
  newBoard.save();

  const newItem = new itemModel({
    idBoard: `${newBoard._id}`,
    content: "Hello",
    tag: TAG_ITEM_BOARD.TO_IMPROVE,
  });
  newItem.save();
}

module.exports = {};
