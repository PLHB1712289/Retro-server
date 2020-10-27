const express = require("express");
const router = express.Router();

const boardController = require("./boardController");

/* GET home page. */
router.get("/", boardController.getBoard);

module.exports = router;
