const userModel = require("../../database/schema/user");

const getUserInfo = async (idUser) => {
  const user = await userModel.findOne({ _id: idUser });
  return user;
};

const changeUserInfo = async (idUser, user) => {
  const oldUser = await userModel.findOne({ _id: idUser });
  const { fullName } = user;
  if (!fullName) return oldUser;
  oldUser.fullName = fullName;
  oldUser.save();
  return oldUser;
};

const changePassword = async (idUser, user) => {
  const oldUser = await userModel.findOne({ _id: idUser });
  const { newPassword } = user;
  oldUser.password = newPassword;
  oldUser.save();
  return oldUser;
};

module.exports = {
  getUserInfo,
  changePassword,
  changeUserInfo,
};
