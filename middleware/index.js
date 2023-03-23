const jwt = require("jsonwebtoken");

const authenticatedUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, "secret_key");
    console.log(decodedToken);
    req.user = decodedToken.id;
    next()
  } catch (err) {
    console.log(err)
  }
};

module.exports = { authenticatedUser };
