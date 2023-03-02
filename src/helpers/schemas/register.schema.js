import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const JoiPassword = Joi.extend(joiPasswordExtendCore);
const loginSchema = Joi.object({
  emailAddress: Joi.string().email().required(),
  password: JoiPassword.string()
    .min(8)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required(),
  firstname: Joi.string().min(2).max(12).required(),
  lastname: Joi.string().min(2).max(12).required(),
  workNumber: Joi.string().min(10).max(15).required(),
  billing: Joi.object({
    address1: Joi.string().max(20),
    state: Joi.string().max(20),
    zip: Joi.string().max(20),
    city: Joi.string().max(20),
  }),
});

export default loginSchema;
