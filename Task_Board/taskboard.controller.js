const express = require("express");
const task_repository = require("./taskboard.repository");
const { StatusCodes } = require("http-status-codes");
const task_board_Schema = require("./taskboard.validation");

const task_create_controller = async (req, res) => {
  const body_values = req.body;
  if (!body_values)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "No values found" });

  try {
    const { error, value } = await task_board_Schema.validate(body_values);
    if (error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Error", error: error });

    await task_repository.create_task_query(body_values);

    return res
      .status(StatusCodes.OK)
      .json({ message: "Task created Successfully", data: {} });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Task Not created Successfully", error: error });
  }
};

module.exports = { task_create_controller };
