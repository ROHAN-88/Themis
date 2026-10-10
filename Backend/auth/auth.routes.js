const express = require("express");
const auth_controller = require("./auth.controller");
const { validated } = require("../middleware/validation.middleware");
const {
  login_schema,
  signup_schema,
  refresh_schema,
} = require("./auth.schema");
const auth_routes = express.Router();

auth_routes.post("/login", validated(login_schema), auth_controller.login);

auth_routes.post("/signup", validated(signup_schema), auth_controller.signup);

auth_routes.post(
  "/refresh",
  validated(refresh_schema),
  auth_controller.refresh_token_generator,
);

module.exports = auth_routes;
