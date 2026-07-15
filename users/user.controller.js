const express = require("express");
const db = require("../config/db");
const userRepo = require("./user.repository");
const { StatusCodes } = require("http-status-codes");
const { user_schema } = require("./user.validation");

const user_create_api = async (req, res) => {
  const values = req.body;
  try {
    const validate = user_schema.validate(values);
    if (!validate)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Validation Error" });

    await userRepo.insertUser(values);

    return res.status(StatusCodes.CREATED).json("User Added Successfully");
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

const get_all_users = async (req, res) => {
  try {
    const results = await userRepo.findAllUsers();
    res
      .status(StatusCodes.OK)
      .json({ message: "User fetched successfully", data: results });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json("Unexpected Error", error);
  }
};

const user_delete_by_id = async (req, res) => {
  const userID = req.params.userid;
  try {
    if (!userID)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "ID not found" });

    await userRepo.delete_user_by_id(userID);
    res
      .status(StatusCodes.OK)
      .json({ message: `User (${userID}) deleted Successfully` });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Could not delete user", data: error });
  }
};

const update_user_detail = async (req, res) => {
  const userId = req.params.userid;
  const { name, email, phoneno, address, age, gender } = req.body;
  try {
    const result = await userRepo.update_user_detail(
      userId,
      name,
      email,
      phoneno,
      address,
      age,
      gender,
    );

    res.status(StatusCodes.OK).json({ message: "User Update", data: result });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error  " });
  }
};
module.exports = {
  user_create_api,
  user_delete_by_id,
  get_all_users,
  update_user_detail,
};
