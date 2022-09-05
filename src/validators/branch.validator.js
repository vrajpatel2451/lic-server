import Joi from 'joi';

class BranchValidator {
  static createBranch() {
    return Joi.object({
      name: Joi.string().required(),
      branchCode: Joi.string().required(),
      email: Joi.string().required().email(),
      phone: Joi.string().required().length(10).pattern(/^[0-9]+$/),
      line1: Joi.string().required(),
      line2: Joi.string(),
      area: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      pin: Joi.number().required().min(100000).max(999999),
      departments: Joi.array(),
    });
  }
}

export default BranchValidator;