const express = require("express");
const { signUpUser } = require("../controllers/users/signUp");
const { signInUser } = require("../controllers/users/signIn");
const router = express.Router();

//Post /users/signUp --> sign UP a user
router.post("/sign-up", signUpUser);

//Post /users/signIn --> sign IN a user
router.post("/sign-in", signInUser);

module.exports = router;
