const { signIn, signUp } = require("./authServices");

const POST_signUp = async (req, res, next) => {
  console.log("POST_signUp");
  const signUpResult = await signUp(req.body);

  const resStatus = signUpResult ? "Success" : "Failed";

  res.send(resStatus);
};

const POST_signIn = async (req, res, next) => {
  const token = await signIn(req.body);

  if (token !== null) {
    res.json({ message: "ok", token: token });
  } else {
    res.status(401).json({ message: "no such user found" });
  }
};

module.exports = { POST_signUp, POST_signIn };
