const express = require("express");
const {
  task_create_controller,
  task_update_controller,
  task_getall_controller,
  archive_task,
} = require("./taskboard.controller");
const { authenticateJWT } = require("../middleware/authentication");

const task_routes = express.Router();

task_routes.get("/", authenticateJWT, task_getall_controller);

task_routes.post("/create", authenticateJWT, task_create_controller);

task_routes.patch("/update/:taskid", authenticateJWT, task_update_controller);

task_routes.put("/archive_task/:task_id", archive_task);

module.exports = task_routes;
