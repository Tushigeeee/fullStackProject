const mongoose = require("mongoose");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { CreateToken } = require("../../utils/utils");

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Please enter your email and password.");
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).send("User does not exist.");
    return;
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    res.status(400).send("Invalid credentials.");
    return;
  }
  const token = CreateToken(user._id);
  res.status(200).json({
    message: "Sign in successfully",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      userImage: user.userImage,
    },
    token,
  });
};

module.exports = { signInUser };
