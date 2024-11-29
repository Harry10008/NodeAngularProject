import Joi from 'joi';

const userSchema = Joi.object({
  //id: Joi.number().integer().optional(), 
  name: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z\s\-']+$/)
    .required()
    .messages({
      'string.base': 'Username must be a string.',
      'string.min': 'Username must be at least 3 characters long.',
      'string.pattern.base' : 'username must be contain only alphabets.' ,
      'any.required': 'Username is required.'
    }),

  email: Joi.string()
    .email()
    .required()
    //.pattern(/^[a-zA-Z0-9._%+-]+@[example]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.base': 'Email must be a string.',
      'string.email': 'Please provide a valid email address.',
      'string.pattern.base' : 'Email must be on username@domain.com.' ,
      'any.required': 'Email is required.'
      
    }),

//   password: Joi.string()
//     .min(6)
//     .regex(/[a-zA-Z]/)
//     .regex(/[0-9]/)
//     .required()
//     .messages({
//       'string.base': 'Password must be a combination of alphabets, at least one symbol, and number.',
//       'string.min': 'Password must be at least 6 characters long.',
//       'any.required': 'Password is required.'
//     }),

  mobile: Joi.number()
    .min(10)
    .required()
    .messages({
      'string.base': 'Mobile number must be a number.',
      'string.min': 'Mobile number must be at least 10 digits long.',
      'any.required': 'Contact detail is required.'
    }),

//   gender: Joi.string()
//     .valid('male', 'female', 'other')
//     .required()
//     .messages({
//       'any.required': 'Gender is required.'
//     }),

//   address: Joi.string().optional().allow(''),
  city: Joi.string().optional().allow(''),

  
});

export default userSchema;

