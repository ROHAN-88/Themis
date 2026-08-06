const joi = require("joi");

const task_board_Schema = joi.object({
  task_name: joi.string().min(2).max(70).required(),
  description: joi.string().min(2).max(100),
  priority: joi.string().required(),
  created_by: joi.string(),
  assignee_to: joi.string().allow(" "),
  task_type: joi.string,
  status: joi.string().required(),
});

const task_type_Schema = joi.object({
  title: joi.string().required(),
  color: joi.string(),
});
module.exports = { task_board_Schema, task_type_Schema };
