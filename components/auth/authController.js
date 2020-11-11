const { signIn, signUp } = require("./authServices");

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

module.exports = { POST_signUp, POST_signIn };
