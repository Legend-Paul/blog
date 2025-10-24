import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log("Server started", PORT);
});

server.on("error", (err) => {
    console.error(err && err.message ? err.message : String(err));
    process.exit(1);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
});
