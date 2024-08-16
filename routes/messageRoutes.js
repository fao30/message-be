const express = require("express");
const {
  createMessage,
  getMessages,
} = require("../controllers/messageController");
const router = express.Router();

router.post("/message", createMessage);
router.get("/messages", getMessages);

module.exports = router;
