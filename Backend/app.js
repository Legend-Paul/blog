import express from "express";
import dotenv from "dotenv";
import signupRoute from "./routes/signup.js";
import blogRoute from "./routes/blog.js";
import adminDashboardRoute from "./routes/adminDashboard.js";
import loginRoute from "./routes/login.js";
import forgotPasswordRoute from "./routes/forgotPassword.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import requireAuth from "./config/auth.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth
app.use(passport.initialize());
passportConfig(passport);

// general Routes
app.use("/auth/login", loginRoute);
app.use("/auth/signup", signupRoute);
app.use("/auth/forgot-password", forgotPasswordRoute);

app.use("/api", requireAuth, blogRoute);
// admin route
app.use("/dashboard", requireAuth, adminDashboardRoute);

app.get("/", requireAuth, (req, res) => {
    res.json({ user: req.user });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
});

const server = app.listen(PORT, () => {
    console.log("Server started on port", PORT);
});

server.on("error", (err) => {
    console.error(err && err.message ? err.message : String(err));
    process.exit(1);
});
