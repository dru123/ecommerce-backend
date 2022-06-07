const Joi = require("joi");
//using joi for validaion of incoming data in requests
const schema = Joi.object({
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
module.exports = schema;
