import Joi from 'joi';

class AuthValidator {
  static login() {
    return Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    });
  }
  static createUser() {
    return Joi.object({
      email: Joi.string().required().email(),
      phone: Joi.string().required().length(10).pattern(/^[0-9]+$/),
      password: Joi.string().required().min(8).max(15).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    //   userName: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      branch: Joi.string().allow(''),
      role: Joi.string().required(),
      workRole: Joi.array().required(),
      department: Joi.array().required(),
      image: Joi.required(),
      line1: Joi.string().required(),
      line2: Joi.string(),
      area: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      pin: Joi.number().required().min(100000).max(999999),
    });
  }
}

export default AuthValidator;