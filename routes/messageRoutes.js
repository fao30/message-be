const express = require("express");
const {
  createMessageController,
  getMessagesController,
} = require("../controllers/messageController");
const router = express.Router();

router.post("/message", createMessageController);
router.get("/messages", getMessagesController);

module.exports = router;
