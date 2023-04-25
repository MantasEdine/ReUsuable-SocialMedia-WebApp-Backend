import bcrypt from "bcrypt";
// to encrypt our password
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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
      //   here we are distructuring informations from request body and
      //   from frontend we will have to send an object of these arguments to work out with and dan
      //    grab it and use it in this fucntion
    } = req.body;

    const salt = await bcrypt.genSalt();
    // this is going to creat random salt provided by bcrypt
    // and we will use it to encrypt our password

    const passwordHash = await bcrypt.hash(password, salt);
    // and here we are encrypting our password so our password wont be exposed
    // the general idea is to creaat a salt a password and has them togther
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 100),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Loggin In

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invlaid Password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
