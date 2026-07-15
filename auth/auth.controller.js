const { express } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { user_login } = require("./auth.repository");
const { user_login_schema } = require("./auth.validation");

const login = async (req, res) => {
  const user_login_body = req.body;
  try {
    const user_valid = await user_login_schema.validate(user_login_body);
    if (!user_valid)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid Credential" });

    const user_detail = await user_login(user_login_body?.email);

    const bcrypt_pass = await bcrypt.compare(
      user_login_body.password,
      user_detail.password,
    );

    if (!bcrypt_pass)
      return res.status(StatusCodes.BAD_REQUEST).json("Invalid Credential");

    const token = jwt.sign({ id: user_detail.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Logged Successfully",
      data: {
        jwt_token: token,
        email: user_detail.email,
        id: user_detail.id,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "just testing", data: error });
  }
};

module.exports = { login };
