const express = require("express");
const task_repository = require("./taskboard.repository");
const { StatusCodes } = require("http-status-codes");
const task_board_Schema = require("./taskboard.validation");
const { boolean } = require("joi");

const task_getall_controller = async (req, res) => {
  try {
    const tasks_detail = await task_repository.get_all_task();
    return res
      .status(StatusCodes.OK)
      .json({ message: "Query Successfully", data: tasks_detail });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Query Unsuccessfully", data: {} });
  }
};

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

    const created_user_id = req.user.id;
    await task_repository.create_task_query(body_values, created_user_id);

    return res
      .status(StatusCodes.OK)
      .json({ message: "Task created Successfully", data: {} });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Task Not created Successfully", error: error });
  }
};

const task_update_controller = async (req, res) => {
  const body_values = req.body;
  const task_id = req.params.taskid;
  const update_user_id = req.user;

  if (!body_values || !task_id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "No data found", data: {} });

  try {
    const is_data_valid = await task_board_Schema.validate(body_values);
    if (!is_data_valid)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Validation Error", data: {} });

    await task_repository.update_task_query(
      body_values,
      task_id,
      update_user_id,
    );

    return res
      .status(StatusCodes.OK)
      .json({ message: "Updated Task successfully", data: {} });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error", error: error.message });
  }
};

const archive_task = async (req, res) => {
  const task_id = req.params.task_id;
  const archive_boolean = req.body;
  if (!archive_boolean || !task_id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "No Boolean was passed", data: {} });
  }
  try {
    await task_repository.archive_Task(task_id, archive_boolean);
    return res
      .status(StatusCodes.OK)
      .json({ message: "task Updated", data: {} });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Could not update Task archive", error: error });
  }
};

module.exports = {
  task_create_controller,
  task_update_controller,
  task_getall_controller,
  archive_task,
};
