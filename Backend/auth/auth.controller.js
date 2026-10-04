const { express } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { user_login, user_signup_repository } = require("./auth.repository");
const { user_login_schema } = require("./auth.validation");
const { contains_emoji } = require("../utils/emoji.checker");
const { findAllUsers } = require("../users/user.repository");
const { error } = require("console");

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
    const refresh_token = jwt.sign(
      { id: user_detail.id, email: user_detail.email },
      process.env.REFRESH_SECRET_JWT_KEY,
      { expiresIn: "1d" },
    );

    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(StatusCodes.OK).json({
      message: "Logged Successfully",
      data: {
        id: user_detail.id,
        email: user_detail.email,
        jwt_token: token,
      },
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Invalid Credential", data: error });
  }
};

const signup = async (req, res) => {
  try {
    const value = req.body;
    if (contains_emoji(value.name) || contains_emoji(value.password)) {
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ message: "Name cannot contain emoji" });
    }
    const user_data = await findAllUsers();

    //CHECK if email exist
    user_data.map((item, index) => {
      if (item.email === value.email) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ message: "Email already Exist" });
      }
    });

    await user_signup_repository(value);
    return res
      .status(StatusCodes.OK)
      .json({ message: "Signup Successfully", data: {} });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message || error, data: {} });
  }
};
module.exports = { login, signup };
