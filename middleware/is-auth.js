const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
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
  req.isAdmin = decodeToken.isAdmin;
  next();
};
