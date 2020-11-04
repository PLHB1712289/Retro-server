const express = require("express");
const router = express.Router();
const authenticate = require("../../passport/authenticate");

const userController = require("./userController");

/* GET home page. */
router.get("/", authenticate(), userController.GET_userInfo);

router.post("/", authenticate(), userController.POST_changeUserInfo);

router.post(
  "/change-password",
  authenticate(),
  userController.POST_changePassword
);

module.exports = router;
