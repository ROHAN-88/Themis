const Joi = require('joi');

const login_schema = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required()
})

const signup_schema =Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required(),
    phoneno:Joi.string().required()
})

module.exports = {login_schema,signup_schema};