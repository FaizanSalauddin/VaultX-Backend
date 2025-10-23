import { User } from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password)
      return res.json({ message: "All fields are required", success: false });

    // check existing user
    let user = await User.findOne({ email });
    if (user)
      return res.json({ message: "User already exists", success: false });

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create new user
    user = await User.create({ name, email, password: hashPassword });

    res.json({
      message: "User created successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password)
      return res.json({ message: "All fields are required", success: false });

    // find user
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ message: "User does not exist", success: false });

    // compare password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.json({ message: "Invalid password", success: false });

    // create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT, {
      expiresIn: "1d",
    });

    res.json({
      message: `${user.name}`,
      token,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};
