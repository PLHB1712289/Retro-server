const boardModel = require("./schema/board");
const userModel = require("./schema/user");
const itemModel = require("./schema/item");

if (process.env.CREATE_DATA_EXAMPLE == "true") {
  console.log("create data example");

  new boardModel({
    id: "1",
    title: "board title",
    description: "board description",
    idUser: "board idUser",
  }).save();

  new userModel({
    id: "1",
    username: "User1",
    password: "userpassword",
    email: "user.email.@gmail.com",
    fullName: "user's fullname",
    phoneNumber: "123456789",
    dob: new Date(),
  }).save();

  new itemModel({
    id: "1",
    idBoard: "1",
    wentWell: "went well",
    toImprove: "to improve",
    actionItems: "action items",
  }).save();
}

module.exports = {};
