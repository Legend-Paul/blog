import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import signupRoute from "./routes/signup.js";
import blogRoute from "./routes/blog.js";
import adminDashboardRoute from "./routes/adminDashboard.js";
import loginRoute from "./routes/login.js";
import updateAuthorHandler from "./routes/updateAuthor.js";
import forgotPasswordRoute from "./routes/forgotPassword.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import requireAuth from "./config/auth.js";
import publicSignupRoute from "./routes/publicSignup.js";
import publicLoginRoute from "./routes/publicLogin.js";
import publicforgotPasswordRoute from "./routes/publicforgotPassword.js";
import publicActionRouter from "./routes/publicAction.js";
import { getBlogComments } from "./controllers/commentHandler.js";
import {
  getPublicBlogs,
  getPublicBlog,
} from "./controllers/publicBlogHandler.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://blooger-mizs.onrender.com", "https://bloog-wcim.onrender.com"]
      : true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Auth
app.use(passport.initialize());
passportConfig(passport);

// author auth Routes
app.use("/auth/login", loginRoute);
app.use("/auth/signup", signupRoute);
app.use("/auth/forgot-password", forgotPasswordRoute);
app.use("/auth/update", requireAuth, updateAuthorHandler);

// public auth Routes
app.use("/:author/auth/signup", publicSignupRoute);
app.use("/:author/auth/login", publicLoginRoute);
app.use("/:author/auth/forgot-password", publicforgotPasswordRoute);

// public routes
app.get("/:author/api/blogs", getPublicBlogs);
app.get("/:author/api/blog/:slug", getPublicBlog);
app.get("/:author/api/blog/:slug/comments", getBlogComments);
app.use("/:author/api", requireAuth, publicActionRouter);

// author route
app.use("/dashboard", requireAuth, adminDashboardRoute);
app.use("/api", requireAuth, blogRoute);

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
