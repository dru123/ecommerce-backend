//checking for rights to manipulate database

module.exports = (req, res, next) => {
  if (req.isAdmin) {
    console.log("I m admin");
    next();
  } else {
    const error = new Error("You donot have access to manipulate database");
    error.statusCode = 401;
    throw error;
  }
};
