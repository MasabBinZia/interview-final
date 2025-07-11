import { Request, Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth.middleware";

const transformUser = (user: any) => ({
  id: user._id.toString(),
  email: user.email,
  name: user.name,
  role: user.role,
});

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    const transformedUsers = users.map(transformUser);
    res.status(200).json(transformedUsers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(transformUser(user));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["admin", "manager", "user"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: "Role updated successfully",
      user: transformUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update role", error });
  }
};
