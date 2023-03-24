const express = require("express");
const router = express.Router();
const { createNotes, deleteNotes, getNotes, updateNotes } = require("../controller/note");
const { authenticatedUser } = require("../middleware/index");

router.get("/notes", getNotes)
router.post("/create", authenticatedUser,  createNotes);
router.delete("/delete/:id", authenticatedUser, deleteNotes);
router.put("/update/:id", authenticatedUser, updateNotes)

module.exports = router;
