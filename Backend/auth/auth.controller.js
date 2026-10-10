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

    const access_token = jwt.sign(
      { id: user_detail.id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );
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

    // res.cookie("user_id", user_detail.id, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    return res.status(StatusCodes.OK).json({
      message: "Logged Successfully",
      data: {
        id: user_detail.id,
        email: user_detail.email,
        jwt_token: access_token,
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

const refresh_token_generator = async (req, res) => {
  try {
    const get_refreshtoken_cookies = req.cookies;
    const { user_id } = req.body;
    if (!get_refreshtoken_cookies && !user_id) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Unauthorized" });
    }
    console.log("1");
    jwt.verify(
      get_refreshtoken_cookies.refreshToken,
      process.env.REFRESH_SECRET_JWT_KEY,
      async (error, decode) => {
        console.log("2");
        if (error) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Error", data: error });
        } else {
          const access_token = await jwt.sign(
            { id: user_id },
            process.env.SECRET_KEY,
            {
              expiresIn: "1h",
            },
          );

          console.log(access_token);
          return res.status(StatusCodes.OK).json({ jwt: access_token });
        }
      },
    );
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Unexpected Error", error });
  }
};
module.exports = { login, signup, refresh_token_generator };
