// const { User } = require("../model/userModel");
const Note = require("../model/notesModel");
const { v4: uuidv4 } = require("uuid");

const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    return res.status(200).json({
      data: notes,
    });
  } catch (err) {
    console.log(err);
  }
};

const createNotes = async (req, res) => {
  const { title, description, date, status } = req.body;
  if(!title){
    return res.status(404).send("Title cannot be empty")
  }
  if(!description){
    return res.status(404).send("Description cannot be empty")
  }
  if(!date){
    return res.status(404).send("Title cannot be empty")
  }
  try {
    let userId = req.user;
    if (!userId) {
      return res.status(404).send("You cannot create note");
    }
    const note = await Note.create({
      id: uuidv4(),
      title,
      description,
      date,
      status,
      userId,
    });
    return res.status(201).json({
      message: `${note.title} has been created successfully`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: "Server Error",
    });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user;
    const note = await Note.findOne({ where: { id: noteId } });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this code" });
    }
    await note.destroy();
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: "Server Error",
    });
  }
};

const updateNotes = async (req, res) => {
  const { title, description, date, status } = req.body;
  try {
    const noteId = req.params.id;
    const userId = req.user;
    const note = await Note.findOne({ where: { id: noteId } });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this note" });
    }

    await note.update({
      title,
      description,
      date,
      status,
    });

    return res.status(200).json({
      message: `${note.title} has been updated successfully`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: "Server Error please try again",
    });
  }
};

module.exports = { getNotes, createNotes, deleteNotes, updateNotes };
