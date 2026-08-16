const express = require("express");
const db = require("./config/db");
require("dotenv").config();
const app = express();
const userRoutes = require("./users/user.route");
const authRoutes = require("./auth/auth.routes");
const task_routes = require("./Task_Board/taskboard.routes");
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,

}));

const apiRouter = express.Router();

apiRouter.use("/user", userRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/task_board", task_routes);

app.use("/api",apiRouter);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listing on : ${PORT}`);
});
