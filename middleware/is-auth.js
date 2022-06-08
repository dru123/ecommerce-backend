const jwt = require("jsonwebtoken");
const User = require("../models/user");
module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader, "authHeader");
  if (!authHeader) {
    const error = new Error("No header found");
    error.statusCode = 404;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, "authToken");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodeToken) {
    const error = new Error("No token found");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodeToken.userId;
  const user = await User.findById(decodeToken.userId);

  req.user = user; //getbACK  mongoose model of user

  req.isAdmin = decodeToken.isAdmin;
  next();
};
