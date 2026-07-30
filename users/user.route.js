const express = require("express");
const db = require("../config/db");
const userController = require("./user.controller");
const { authenticateJWT } = require("../middleware/authentication");
const Userroutes = express.Router();

Userroutes.get("/getUsers", authenticateJWT, userController.get_all_users);

Userroutes.post("/createUser", userController.user_create_api);

Userroutes.delete(
  "/deleteUser/:userid",
  authenticateJWT,
  userController.user_delete_by_id,
);

Userroutes.put(
  "/updateUser/:userid",
  authenticateJWT,
  userController.update_user_detail,
);

Userroutes.get(
  "/getUserById",
  authenticateJWT,
  userController.get_user_detail_by_ID,
);
module.exports = Userroutes;
