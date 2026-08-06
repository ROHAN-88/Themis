const express = require("express");
const task_repository = require("./taskboard.repository");
const { StatusCodes } = require("http-status-codes");
const {
  task_board_Schema,
  task_type_Schema,
} = require("./taskboard.validation");
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
    const { error, value: validated } =
      await task_board_Schema.validate(body_values);
    if (error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Error", error: error });

    const created_user_id = req.user.id;
    await task_repository.create_task_query(validated, created_user_id);

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
    const { error, value: validated } =
      await task_board_Schema.validate(body_values);
    if (error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Validation Error", data: {} });

    await task_repository.update_task_query(validated, task_id, update_user_id);

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

//task type below
const get_all_task_type = async (req, res) => {
  try {
    const task_type_details = await task_repository.get_all_task_type();
    return res
      .status(StatusCodes.OK)
      .json({ message: "Successfully got Task Type", data: task_type_details });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Could not load tasks _type", data: {} });
  }
};

const create_task_type = async (req, res) => {
  const task_body_values = req.body;
  try {
    if (!task_body_values)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid inputs / something went wrong",
        data: {},
      });

    const { error, value: validated } =
      await task_type_Schema.validate(task_body_values);

    if (error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid input", data: {} });

    await task_repository.create_task_type_sql(validated);
    return res
      .status(StatusCodes.OK)
      .json({ message: "Added task successfully", data: {} });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong", error: error });
  }
};

const update_task_type_controller = async (req, res) => {
  const request_body = req.body;
  const tasktypeid = req.params.tasktypeid;
  try {
    if (!request_body || !tasktypeid || Object.keys(request_body).length === 0)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Something went wrong/body not found", data: {} });

    const { error, value: validate } =
      await task_type_Schema.validate(request_body);

    if (error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Validation Failed", error: error });

    await task_repository.update_task_type_sql(validate, tasktypeid);

    return res
      .status(StatusCodes.OK)
      .json({ message: "Updated Task type table successfully", data: {} });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server Error", error });
  }
};
module.exports = {
  task_create_controller,
  task_update_controller,
  task_getall_controller,
  archive_task,
  get_all_task_type,
  create_task_type,
  update_task_type_controller,
};
