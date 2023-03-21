var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", (req, res) => {
  console.log("Endpoint");
});

module.exports = router;
