import Joi from 'joi';

const adminSchema = Joi.object({
  id: Joi.number().integer().optional(), 
  email: Joi.string().email()
    .min(3)
    .required()
    .messages({
      'string.min': 'email must be at least 3 characters long.',
      'any.required': 'email is required.'
    }),
    Password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
      "string.empty": `Password cannot be empty`,
      "any.required": `Password is required`,
    }),

})
export default adminSchema