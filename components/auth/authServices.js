const userModel = require("../../database/schema/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRound = 10;
const secretKey = "secret";

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
      const token = jwt.sign(payload, secretKey);
      return { token, errorMessage: null };
    } else return { token: null, errorMessage: "Error password!" };
  }

  return { token: null, errorMessage: "User not found!" };
};

const signInWithSocialAccount = (id) => {
  const payload = { id };
  const token = jwt.sign(payload, secretKey);

  return { token, errorMessage: "Sign in success" };
};

module.exports = { signUp, signIn, signInWithSocialAccount };
