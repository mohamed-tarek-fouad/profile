import Joi from "joi";

const loginSchema = Joi.object({
  emailAddress: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default loginSchema;
