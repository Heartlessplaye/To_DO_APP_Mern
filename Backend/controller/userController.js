const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
require("dotenv").config();

const JwtSecretKey = process.env.JWT_SECRET_KEY;

const generateToken = (id) => {
  // console.log(id);
  return jwt.sign({ id }, JwtSecretKey, { expiresIn: "30d" });
};
// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check all fields are filled or not
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // check if user already exist
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }

  // create hash password

  const salt = await bcrypt.genSalt(10);  // generate salt 
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// AUTHENTICATE THE USER
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});


// GET LOGGED IN USER DATA
const getLoggedInUser = asyncHandler( async(req, res) => {

  const user = await User.findOne({_id : req.userId});
  res.status(200).json({
    id : user._id,
    name : user.name,
    email : user.email
  })

});

module.exports = {
  registerUser,
  loginUser,
  getLoggedInUser,
};
