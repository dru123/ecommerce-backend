//checking for rights to manipulate database
//only admin can add store and device in the database
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
