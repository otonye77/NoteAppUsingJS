const express = require("express");
const router = express.Router();
const { createNotes } = require("../controller/note");
const { authenticatedUser } = require("../middleware/index");

router.post("/create", authenticatedUser,  createNotes);

module.exports = router;
