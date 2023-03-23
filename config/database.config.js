const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "mydatabase.db",
});

sequelize.sync().then(() => {
  console.log("Database and tables created");
});

module.exports = sequelize;

