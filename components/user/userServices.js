const bcrypt = require("bcrypt");
const userModel = require("../../database/schema/user");
const saltRound = 10;
console.log("salt round ", saltRound);

const getUserInfo = async (idUser) => {
  const userInfo = await userModel.findOne({ _id: idUser });
  return userInfo;
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
  const { oldPass, newPass } = user;

  try {
    if (bcrypt.compareSync(oldPass, oldUser.password)) {
      const hashCodePassword = bcrypt.hashSync(newPass, saltRound);

      oldUser.password = hashCodePassword;
      oldUser.save();
      return oldUser;
    }
    return null;
  } catch (e) {
    return null;
  }
};

module.exports = {
  getUserInfo,
  changePassword,
  changeUserInfo,
};
