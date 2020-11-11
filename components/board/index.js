const express = require("express");
const router = express.Router();
const authenticate = require("../../passport/authenticate");

const boardController = require("./boardController");

/* GET home page. */
router.get("/", authenticate(), boardController.GET_getAllBoard);
router.post("/add", authenticate(), boardController.POST_createNewBoard);
router.post("/remove", authenticate(), boardController.POST_removeBoard);
router.post("/change", authenticate(), boardController.POST_changeBoard);
router.post("/share", authenticate(), boardController.POST_shareBoard);
router.get("/:id", authenticate(), boardController.GET_getBoardItems);
router.post("/:id/add-item", authenticate(), boardController.POST_addBoardItem);
router.post(
  "/:id/change-item",
  authenticate(),
  boardController.POST_changeBoardItem
);
router.post(
  "/:id/remove-item",
  authenticate(),
  boardController.POST_removeBoardItem
);

module.exports = router;
