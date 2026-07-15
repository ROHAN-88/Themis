const express = require("express");
const db = require("./config/db");
require("dotenv").config();
const app = express();
const userRoutes = require("./users/user.route");
const authRoutes = require("./auth/auth.routes");

app.use(express.json());

const PORT = process.env.PORT;

app.use("/test", (req, res) => {
  res.send("Hello server working");
});

app.use("/", userRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Listing on : ${PORT}`);
});
