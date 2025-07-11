import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";
import { SignupInput, LoginInput } from "../utils/validationSchemas";

export const signup = async (
  req: Request<{}, {}, SignupInput>,
  res: Response
) => {
  const { email, password, name } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const isFirstUser = (await User.countDocuments({})) === 0;
    const role = isFirstUser ? "admin" : "user";

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashed, name, role });

    try {
      const token = generateToken(newUser._id.toString(), newUser.role);
      return res.status(201).json({
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
      });
    } catch (tokenErr) {
      return res.status(500).json({ message: "Token generation failed" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Signup failed", error: err });
  }
};

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id.toString(), user.role);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};
