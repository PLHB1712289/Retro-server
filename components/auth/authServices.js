const userModel = require("../../database/schema/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRound = 10;

const signUp = async (userInfo) => {
  const { email, fullName, password } = userInfo;

  const isExistUser = await userModel.findOne({ email: email });

  if (isExistUser) {
    return { status: false, errorMessage: "User already exist" };
  } else {
    const hashCodePassword = bcrypt.hashSync(password, saltRound);
    const newUser = new userModel({
      email,
      fullName,
      password: hashCodePassword,
    });

    newUser.save();
    return { status: true, errorMessage: "Sign up success" };
  }
};

const signIn = async (userInfo) => {
  const { email, password } = userInfo;

  const isExistUser = await userModel.findOne({ email: email });

  if (isExistUser) {
    if (bcrypt.compareSync(password, isExistUser.password)) {
      const payload = { id: isExistUser._id };
      const token = jwt.sign(payload, "secret");
      return { token, errorMessage: null };
    } else return { token: null, errorMessage: "Error password!" };
  }

  return { token: null, errorMessage: "User not found!" };
};

module.exports = { signUp, signIn };
