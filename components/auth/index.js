const express = require("express");
const router = express.Router();

const authController = require("./authController");

/* GET home page. */
router.post("/", authController.POST_signUp);
router.post("/sign-up", authController.POST_signUp);
router.post("/sign-in", authController.POST_signIn);

module.exports = router;
