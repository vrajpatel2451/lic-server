import Joi from 'joi';

class TaskValidator {
  static createDepartment() {
    return Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      deadline: Joi.date().required(),
      branch: Joi.string().required(),
      department: Joi.string().required(),
      head: Joi.string().required(),
      staff: Joi.string().required(),
      client: Joi.string().required(),
      tastType:Joi.string().required(),
      document:Joi.object({
          name:Joi.string().required(),
          type:Joi.string().required(),
      }),
      fields:Joi.object({
          name:Joi.string().required(),
          value:Joi.string(),
      }),
    });
  }
}

export default TaskValidator;