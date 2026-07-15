const express = require("express");
const db = require("../config/db");
const userController = require("./user.controller");
const { authenticatJWT } = require("../middleware/authentication");
const Userroutes = express.Router();

Userroutes.get("/getUsers", authenticatJWT, userController.get_all_users);

Userroutes.post("/createUser", authenticatJWT, userController.user_create_api);

Userroutes.delete(
  "/deleteUser/:userid",
  authenticatJWT,
  userController.user_delete_by_id,
);

Userroutes.put(
  "/updateUser/:userid",
  authenticatJWT,
  userController.update_user_detail,
);

module.exports = Userroutes;
