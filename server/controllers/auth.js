import bcrypt from "bcrypt";
// to encrypt our password
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { hashPassword } from "../middleware/hashPassword.js";
import dotenv from "dotenv";
import { comparePassword } from "../middleware/comparePassword.js";
import { validate_email } from "../middleware/emailValidator.js";
import cookieParser from "cookie-parser";
dotenv.config();

// token age
const tokenAge = 700000 * 24 * 60 * 60;
// create a new token
const create_token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: tokenAge,
  });
};
// Register User

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    if (!validate_email(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }
    const users = await User.find({ email });
    if (users && users.length) {
      return res.status(400).json({ error: "Email already used" });
    }
    const hPassword = await hashPassword(password);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 100),
    });
    const savedUser = newUser.save();
    if (!savedUser) {
      return res.status(400).json({ error: "User was not created" });
    }
    const token = create_token(savedUser._id);
    res.cookie("jwt", token, { httpOnly: true, tokenAge: tokenAge * 1000 });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Loggin In

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = User.find({ email, password });
    if (!user) {
      res.staus(404).json({ error: "This User Doesn't Exist" });
    }
    if (!email || !password) {
      res.status(403).json({ error: "no email or no password" });
    }
    const userMail = await User.findOne({ email });
    if (!userMail) {
      return res
        .status(400)
        .json({ error: "User doesn't exist with this e-amil" });
    }
    const result = await comparePassword(password, userMail.password);
    if (!result) {
      return res.status(400).json({ error: "password incorrect" });
    }
    const token = create_token(user._id);
    res.cookie("jwt", token, { httpOnly: true, tokenAge: tokenAge * 1000 });
    res.status(200).json({ email: email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const logOut = async (req, res) => {
  req.cookie("jwt", "", { tokenAge: 1 });
};
