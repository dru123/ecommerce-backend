const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//signup post request
exports.postSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //checking email not already exist
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      return res.status(404).json({ message: "Email already exist" });
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
  try {
    const { email, password } = req.body;
    //finding the user from db;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not exist" });
    }

    const isEqualPassword = await bcrypt.compare(password, user.password);
    //checking whether password is same as db or not
    if (!isEqualPassword) {
      return res.status(404).json({ message: "Password not match" });
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
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcnNoQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYyOWYzY2VlOTk5ZDdlZjlmOWI3YzE1OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDYwNDcwNywiZXhwIjoxNjU0NjE5MTA3fQ.gF3fruyjDanD9y-3uo9tMNmoDZ7HWMArM_xTgjGx7XA
