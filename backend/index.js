// Load env FIRST
import "./loadEnv.js";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otp_route.js";
import taskRoutes from "./routes/taskRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";



const app = express();

// Middlewares
// CORS configuration
const corsOptions = {
  origin: "https://hire-helper-omega.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};
// Apply CORS before routes
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Connect MongoDB
connectDB();

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/auth", otpRoutes);   // keep if OTP routes exist
app.use("/api/tasks", taskRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/notifications", notificationRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("HireHelper Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
