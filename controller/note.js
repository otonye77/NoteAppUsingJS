// const { User } = require("../model/userModel");
const Note = require("../model/notesModel");
const { v4: uuidv4 } = require("uuid");

const createNotes = async (req, res) => {
  const { title, description, date, status } = req.body;
  try {
    let userId = req.user;
    console.log(userId);
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
    console.log(note);
    return res.status(201).json({
      message: `${note.title} has been created successfully`,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      err: "Server Error",
    });
  }
};

module.exports = { createNotes };
