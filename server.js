require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dns = require("node:dns/promises");

dns.setServers(["1.1.1.1", "1.0.0.1"]);

const studentRoutes = require("./routes/studentRoutes");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static("public"));

app.use("/api/students", studentRoutes);

console.log("Starting server...");
console.log("MongoDB URI exists:", !!process.env.MONGODB_URI);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });