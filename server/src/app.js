const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const prisma = require("./prisma");

prisma.$connect()
  .then(() => console.log("Database connected successfully"))
  .catch((e) => console.error("Database connection failed:", e));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

module.exports = app;