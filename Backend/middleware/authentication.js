const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authenticateJWT = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Unauthorized" });

  const token_split = token.split(" ")[1];
  jwt.verify(token_split, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Forbidden", data: err });

    req.user = user;
    next();
  });
};

module.exports = { authenticateJWT };
