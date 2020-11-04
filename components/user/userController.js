const userServices = require("./userServices");

const GET_userInfo = async (req, res, next) => {
  const idUser = req.user.id;
  const user = await userServices.getUserInfo(idUser);
  res.send(user);
};

const POST_changeUserInfo = async (req, res, next) => {
  const idUser = req.user.id;
  const user = await userServices.changeUserInfo(idUser, req.body);
  res.send(user);
};

const POST_changePassword = async (req, res, next) => {
  const idUser = req.user.id;
  const user = await userServices.changePassword(idUser, req.body);
  res.send(user);
};

module.exports = { GET_userInfo, POST_changePassword, POST_changeUserInfo };
