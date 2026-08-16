const { express } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { user_login, user_signup_repository } = require("./auth.repository");
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

    return res.status(200).json({
      message: "Logged Successfully",
      data: {
        id: user_detail.id,
        email: user_detail.email,
        jwt_token: token,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "just testing", data: error });
  }
};

const signup = async(req,res)=>{
  try {
    const value = req.body;
    await user_signup_repository(value);
    return res.status(StatusCodes.OK).json({message:"Signup Successfully",data:{}})
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error,data:{}});
  }
}
module.exports = { login,signup };
