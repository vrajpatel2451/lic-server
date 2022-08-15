import Joi from 'joi';

class DepartmentValidator {
  static createDepartment() {
    return Joi.object({
      name: Joi.string().required(),
      branch: Joi.array().required(),
      head: Joi.array().required(),
      staff: Joi.array().required(),
    });
  }
}

export default DepartmentValidator;