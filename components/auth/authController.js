const { signIn, signUp, signInWithSocialAccount } = require("./authServices");

const POST_signUp = async (req, res) => {
  const { status, errorMessage: message } = await signUp(req.body);

  res.status(200).json({ success: status, message });
};

const POST_signIn = async (req, res) => {
  const { token, errorMessage } = await signIn(req.body);

  if (token !== null) {
    res
      .status(200)
      .json({ success: true, message: "Sign in success", token: token });
  } else {
    res.status(200).json({ success: false, message: errorMessage });
  }
};

const GET_callback = async (req, res, next) => {
  const { token } = signInWithSocialAccount(req.user.id);

  res.cookie("auth", token);
  res.redirect(
    `${
      process.env.ENVIRONMENT === "CUS"
        ? process.env.URL_CLIENT_PRODUCT
        : process.env.URL_CLIENT_DEV
    }/login`
  );
};

const GET_failed = async (req, res, next) => {
  res.redirect(
    `${
      process.env.ENVIRONMENT === "CUS"
        ? process.env.URL_CLIENT_PRODUCT
        : process.env.URL_CLIENT_DEV
    }/login`
  );
};

module.exports = {
  POST_signUp,
  POST_signIn,
  GET_callback,
  GET_failed,
};
