//creating common middleware for checking the data
const {
  signupLoginSchema,
  storeSchema,
  deviceSchema,
} = require("../utils/joiValidator");

const signupLoginValidation = async (req, res, next) => {
  //extracting the body from request to validate
  const { name, email, password, isAdmin } = req.body;
  const { error, value } = await signupLoginSchema.validate({
    name: name,
    email: email,
    password: password,
    isAdmin: isAdmin,
  });
  if (error) {
    error.statusCode = 422;
    error.message = error.details;
    throw error;
  } else {
    //if every validation suucess goes to the controller
    next();
  }
};
const storeValidation = async (req, res, next) => {
  const { error, value } = await storeSchema.validate(req.body);
  if (error) {
    error.statusCode = 422;
    error.message = error.details;
    throw error;
  } else {
    //if every validation suucess goes to the controller
    next();
  }
};
const deviceValidation = async (req, res, next) => {
  const { error, value } = await deviceSchema.validate(req.body);
  if (error) {
    error.statusCode = 422;
    error.message = error.details;
    throw error;
  } else {
    //if every validation suucess goes to the controller
    next();
  }
};
module.exports = { signupLoginValidation, storeValidation, deviceValidation };
