import Joi from 'joi';

class WorkRoleValidator {
  static createWorkRole() {
    return Joi.object({
      name: Joi.string().required(),
    });
  }
}

export default WorkRoleValidator;