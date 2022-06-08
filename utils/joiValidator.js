const Joi = require("joi");
//using joi for validaion of incoming data in requests
const signupLoginSchema = Joi.object({
  name: Joi.string().trim().alphanum().min(3).max(30),
  password: Joi.string()
    .trim()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(3)
    .required(),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  isAdmin: Joi.boolean(),
});

//for validation store incoming req.body
const storeSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  description: Joi.string().trim().min(3).max(300).required(),
});

//for validation device incoming data in request
const deviceSchema = Joi.object({
  title: Joi.string().trim().min(3).max(30).required(),
  price: Joi.number().required(),
  description: Joi.string().trim().min(3).max(300).required(),
});
module.exports = { signupLoginSchema, storeSchema, deviceSchema };
