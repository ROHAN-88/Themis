const joi = require("joi");

const user_login_schema = joi.object({
  email: joi
    .string()
    .required()
    .pattern(new RegExp("^[^@\s]+@[^@\s]+\.[^@\s]+$")),
  password: joi
    .string()
    .required()
    .pattern(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$`)),
});

module.exports = { user_login_schema };
