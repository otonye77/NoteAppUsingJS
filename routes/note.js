const express = require("express");
const router = express.Router();
const { createNotes } = require("../controller/note");

router.post("/create", createNotes);

module.exports = router;
