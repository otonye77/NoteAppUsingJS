const Sequelize = require("sequelize");
const sequelize = require("../config/database.config");
const User = require("../model/userModel");

const Note = sequelize.define("Note", {
  id: {
    type: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUIDV4,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  }
});

module.exports = Note;
