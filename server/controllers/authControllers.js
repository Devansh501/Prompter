const User = require("../models/user");
const { hashPassword, comparePassword } = require("../hash/authHash");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json({ mssg: "hekkasp" });
};

// Register user Controller

const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.json({ error: "Enter the details to register!" });
    }
    const userex = await User.findOne({ email });
    const usernm = await User.findOne({ username });
    if (userex || usernm) {
      return res.json({ error: "Credentials are already registered" });
    }
    if (password.length <= 4) {
      return res.json({ error: "Password should be at least 6 characters" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    return res.json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
  }
};

// Login user Controller

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ error: "Enter the Credentials!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User doesn't exists" });
    }
    const flag = await comparePassword(password, user.password);
    if (!flag) {
      return res.json({ error: "Incorrect Password" });
    }
    const token = jwt.sign({user}, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    res.json({ message: "Login Successful", token: token, user });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { test, registerUser, loginUser };
