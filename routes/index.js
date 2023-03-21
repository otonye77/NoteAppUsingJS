var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", {
    title: "Registeration Page",
    name: "OTONYE"
  })
});

module.exports = router;
