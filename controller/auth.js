const bcrypt = require("bcryptjs");
const User = require("../models/user");
const schema = require("../utils/joiValidator");
const jwt = require("jsonwebtoken");

//signup post request
exports.postSignup = async (req, res, next) => {
  const { error, value } = await schema.validateAsync(req.body);
  if (error) {
    error.statusCode = 422;
    error.message = error.details;
    throw error;
  }
  try {
    const { name, email, password } = req.body;

    //checking email not already exist
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      const error = new Error("Email already exists");
      error.statusCode = 404;
      throw error;
    }
    //converting password into hash for protection
    const encryptedPassword = await bcrypt.hash(password, 12);

    //storing user into database
    const user = await new User({
      name: name,
      email: email,
      password: encryptedPassword,
      isAdmin: req.body.isAdmin || false,
      cart: { items: [] },
    });
    user.save();
    res.status(200).json({
      message: "Suucccesfuuly created",
      userId: user._id,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = "Something went wrong";
    }
    next(error);
  }
};

//login feature
exports.postLogin = async (req, res, next) => {
  const { error, value } = await schema.validateAsync(req.body);
  if (error) {
    error.statusCode = 422;
    error.message = error.details;
    throw error;
  }
  try {
    const { email, password } = req.body;
    //finding the user from db;
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("No user exist");
      error.statusCode = 404;
      throw error;
    }

    const isEqualPassword = await bcrypt.compare(password, user.password);
    //checking whether password is same as db or not
    if (!isEqualPassword) {
      const error = new Error("Password not matched");
      error.statusCode = 404;
      throw error;
    }

    //jwt autenthication
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
        isAdmin: user.isAdmin,
      },
      "authToken",
      { expiresIn: "4h" }
    );
    res.status(200).json({
      token: token,
      userId: user._id.toString(),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = "Something went wrong";
    }
    next(error);
  }
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJ1c2VySWQiOiI2MjlmMjI0YzI2N2E3OWU1ZDA5MTI5MDUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NTQ1OTkyOTksImV4cCI6MTY1NDYxMzY5OX0.8R_d06SWW9qUmhZsVOVmM8HazBrUQNID0ZPhk3CfM8I
