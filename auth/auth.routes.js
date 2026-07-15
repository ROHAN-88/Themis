const express = require("express");
const auth_controller = require("./auth.controller");
const auth_routes = express.Router();

auth_routes.get("/login", auth_controller.login);

module.exports = auth_routes;
