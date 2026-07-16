const express = require("express");
const { task_create_controller } = require("./taskboard.controller");
const task_routes = express.Router();

task_routes.post("/", task_create_controller);

module.exports = task_routes;
