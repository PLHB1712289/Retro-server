const express = require("express");
const router = express.Router();
const authenticate = require("../../passport/authenticate");

const boardController = require("./boardController");

/* GET home page. */
router.get("/", authenticate(), boardController.getBoard);
router.post("/add", authenticate(), boardController.createNewBoard);
router.post("/remove", authenticate(), boardController.postRemoveBoard);
router.get("/:id", authenticate(), boardController.getBoardItems);
router.post("/:id/add-item", authenticate(), boardController.postBoardAddItem);
router.post(
  "/:id/remove-item",
  authenticate(),
  boardController.postBoardRemoveItem
);

module.exports = router;
