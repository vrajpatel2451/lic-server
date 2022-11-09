import Joi from 'joi';

class DepartmentValidator {
  static createDepartment() {
    return Joi.object({
      name: Joi.string().required(),
      duration: Joi.number().required(),
      unit: Joi.string().required().valid('hr','days'),
      branch: Joi.array().required(),
      head: Joi.array().required(),
      staff: Joi.array().required(),
    });
  }
}

export default DepartmentValidator;