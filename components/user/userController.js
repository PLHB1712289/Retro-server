const userServices = require("./userServices");

const GET_getUserInfo = async (req, res, next) => {
  const idUser = req.user.id;
  const userInfo = await userServices.getUserInfo(idUser);
  res
    .status(200)
    .json({ success: true, message: "Get user information success", userInfo });
};

const POST_changeUserInfo = async (req, res, next) => {
  const idUser = req.user.id;
  const userInfo = await userServices.changeUserInfo(idUser, req.body);

  res.status(200).json({
    success: true,
    message: "Change user information success",
    userInfo,
  });
};

const POST_changePassword = async (req, res, next) => {
  const idUser = req.user.id;
  const userInfo = await userServices.changePassword(idUser, req.body);

  if (userInfo) {
    res
      .status(200)
      .json({ success: true, message: "Change password success", userInfo });
  } else {
    res.status(200).json({ success: false, message: "Old password invalid" });
  }
};

module.exports = { GET_getUserInfo, POST_changePassword, POST_changeUserInfo };
