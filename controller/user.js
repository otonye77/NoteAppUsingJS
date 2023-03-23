const User = require("../model/userModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
  const { name, email, gender, number, address, password } = req.body;
  const parsedNumber = parseInt(number, 10);
  try {
    const alreadyExists = await User.findOne({ where: { email } });
    if (alreadyExists) {
      return res.status(400).send("User already exists in the database");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      id: uuidv4(),
      name,
      email,
      gender,
      number: parsedNumber,
      address,
      password: encryptedPassword,
    });
    const token = jwt.sign({ email }, "secret_key");
    return res
      .status(201)
      .json({ message: `${newUser.name} created successfully`, token });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { register };
