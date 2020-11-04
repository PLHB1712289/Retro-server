const userModel = require("../../database/schema/user");
const jwt = require("jsonwebtoken");

const signUp = async (userInfo) => {
  const { email, fullName, password } = userInfo;

  const isExistUser = await userModel.findOne({ email: email });

  if (isExistUser) {
    return false;
  } else {
    const newUser = new userModel({ email, fullName, password });
    await newUser.save();
    return true;
  }
  return false;
};

const signIn = async (userInfo) => {
  const { email, password } = userInfo;

  const isExistUser = await userModel.findOne({ email: email });

  if (isExistUser) {
    const payload = { id: isExistUser._id };
    const token = jwt.sign(payload, "secret");
    return token;
  }

  return null;
};

module.exports = { signUp, signIn };
