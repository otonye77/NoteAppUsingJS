var express = require("express");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// sqlite3 mydatabase.db "DELETE FROM users;"

const db = new sqlite3.Database("mydatabase.db");
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT)"
  );
});

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    return res.status(400).send("Name cannot be empty");
  }
  if (!email) {
    return res.status(400).send("Email cannot be empty");
  }
  if (!password) {
    return res.status(400).send("Password cannot be empty");
  }
  try {
    const alreadyExists = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) {
          console.log(err.message);
          reject(err);
          return res.status(500).send("Server error");
        } else if (row) {
          console.log(row);
          resolve(row);
          return res
            .status(400)
            .send("User with this email already exist in our data");
        } else {
          resolve(false);
        }
      });
    });
    if (alreadyExists) {
      return res.status(400).send("User already exist in the database");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    db.run(
      "INSERT INTO users (name, email, password) VALUES (? , ? , ?)",
      [name, email, encryptedPassword],
      (err) => {
        if (err) {
          console.log(err.message);
          return res.status(500).send("Server error");
        }
        const token = jwt.sign({ email }, "secret_key");
        return res
          .status(201)
          .json({ message: "User created successfully", token });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
