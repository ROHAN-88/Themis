const joi = require("joi");

const task_board_Schema = joi.object({
  task_name: joi.string().min(2).max(70).required(),
  description: joi.string().min(2).max(100),
  priority: joi.string().required(),
  status: joi.string().required(),
});

module.exports = task_board_Schema;
