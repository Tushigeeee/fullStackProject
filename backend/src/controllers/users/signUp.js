const mongoose = require("mongoose");
const User = require("../../models/users");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { CreateToken } = require("../../utils/utils");




const signUpUser = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).send("Please enter your email and password.");
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).send("Please provide a valid email");
    return;
  }

  if (!validator.isStrongPassword(password)) {
    res.status(400).send("Please provide a strong password");
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).send("User already exists");
      return;
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      userImage,
    });
    const token = CreateToken(newUser._id);
    res.status(200).json({
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        userImage: newUser.userImage,
      },
      token,
    });
  } catch (err) {
    res.status(500).send(err.message);
    return;
  }
};
module.exports = { signUpUser };
