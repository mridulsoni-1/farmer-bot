const jwt = require("jsonwebtoken");

exports.verifyToken = (Token) => {
  try {
    return jwt.verify(Token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
