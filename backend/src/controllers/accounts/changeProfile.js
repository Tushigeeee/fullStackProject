const User = require("../../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CreateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const changeProfile = async (req, res) => {
  const {
    email,
    password,
    name,
    userImage,
    newPassword,
    newEmail,
    newName,
    newUserImage,
  } = req.body;

  if (
    !email ||
    !password ||
    !name ||
    !userImage ||
    !newEmail ||
    !newPassword ||
    !newName ||
    !newUserImage
  ) {
    res.status(400).send("Please enter your email, password, and name.");
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User does not exist." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(404).json({ message: "Invalid credentials." });
      return;
    }

    if (!validator.isEmail(newEmail)) {
      res.status(400).json({ message: "Email is not a valid email." });
      return;
    }

    if (!validator.isStrongPassword(newPassword)) {
      res.status(400).json({
        message:
          "Password is not strong enough. Please include at least 8 characters, including one uppercase, one lowercase, one number, one symbol.",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.email = newEmail;
    user.password = hashedPassword;
    user.name = newName;
    user.userImage = newUserImage;
    const updateUser = await user.save();
    const token = CreateToken(user._id);

    res.status(200).json({
      user: {
        id: updateUser._id,
        email: updateUser.email,
        name: updateUser.name,
        userImage: userImage.newUserImage,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { changeProfile };
