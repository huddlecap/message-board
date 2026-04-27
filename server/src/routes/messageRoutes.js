const express = require("express");
const { getMessages, createMessage } = require("../controllers/messageController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", getMessages);
router.post("/", authenticateToken, createMessage);

module.exports = router;