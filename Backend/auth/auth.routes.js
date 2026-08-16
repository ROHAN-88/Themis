const express = require("express");
const auth_controller = require("./auth.controller");
const { validated } = require("../middleware/validation.middleware");
const { login_schema, signup_schema } = require("./auth.schema");
const auth_routes = express.Router();

auth_routes.get("/login", validated(login_schema) , auth_controller.login);

auth_routes.post("/signup",validated(signup_schema),auth_controller.signup);
module.exports = auth_routes;
