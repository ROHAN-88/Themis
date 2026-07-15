const joi = require("joi");

const user_schema = joi.object({
  name: joi.string().min(2).max(10).required(),
  email: joi
    .string()
    .pattern(new RegExp("^[^@\s]+@[^@\s]+\.[^@\s]+$"))
    .min(3)
    .max(60)
    .required(),
  password: joi
    .string()
    .required()
    .pattern(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$`)),
  phoneno: joi.string().min(4).max(20).required(),
  address: joi.string(),
  age: joi.number().integer().min(2).max(2),
  gender: joi
    .string()
    .valid("male", "female", "M", "m", "F", "f", "other", "Other"),
});

module.exports = { user_schema };
