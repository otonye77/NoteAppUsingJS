var express = require("express");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");

const db = new sqlite3.Database("mydatabase.db");
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
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server error");
      }
      if (row) {
        return res
          .status(400)
          .send("User with this email already exist in our data");
      }
    });
    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword);
  } catch (err) {}
});

module.exports = router;
