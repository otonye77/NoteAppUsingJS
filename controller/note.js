const { User } = require("../model/userModel");

// Notes:[
//   {
//   Title: 'Paying Mama Ngozi',
//   description: 'I am owing 10k',
//   DueDate:"25th of April 2022",
//   status:"Pending",
//   id:"databaseId1"
//   }
//   ......
// ]

const createNotes = async (req, res) => {
  const { title, description, date } = req.body;
  try {

  } catch (err) {
    
  }
};

module.exports = { createNotes };
