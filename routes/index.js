var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/register", (req, res) => {
  res.render("index", {
    title: "Registeration Page",
    name: "OTONYE",
  });
});

router.get("/", (req, res) => {
  res.render("notes", {
    title: "Notes Page",
    name: "OTONYE",
  });
});

module.exports = router;
