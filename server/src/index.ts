import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
