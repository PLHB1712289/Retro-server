const express = require("express");
const router = express.Router();

const passport = require("passport");

const authController = require("./authController");

/* GET home page. */
router.post("/", authController.POST_signUp);
router.post("/sign-up", authController.POST_signUp);
router.post("/sign-in", authController.POST_signIn);

router.get(
  "/facebook/sign-in",
  passport.authenticate("facebook", {
    session: false,
    scope: ["email"],
  })
);

router.get(
  "/google/sign-in",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get("/failed", authController.GET_failed);

router.post("/google/sign-in", (req, res) => {
  res.send("Sign in with google");
});

router.get(
  "/facebook/callback",

  passport.authenticate("facebook", {
    failureRedirect: `${process.env.URL_CLIENT}/login`,
    session: false,
  }),

  authController.GET_callback
);

router.get(
  "/google/callback",

  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.URL_CLIENT}/login`,
  }),

  authController.GET_callback
);

module.exports = router;
