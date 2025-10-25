import express from "express";
import dotenv from "dotenv";
import signupRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
    console.log("Server started", PORT);
});

app.use("/login", loginRoute);
app.use("/signup", signupRoute);

server.on("error", (err) => {
    console.error(err && err.message ? err.message : String(err));
    process.exit(1);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
});
