var express = require("express");
var router = express.Router();

const authenticate = require("../passport/authenticate");

/* GET home page. */
router.get("/", authenticate(), (req, res, next) => {
  res.send(req.user.id);
});

module.exports = router;
