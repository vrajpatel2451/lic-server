import Joi from 'joi';

class TaskValidator {
  static createTask() {
    return Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      deadline: Joi.date().required(),
      branch: Joi.string().required(),
      department: Joi.string().required(),
      head: Joi.string().required(),
      client: Joi.string().required(),
      taskType:Joi.string().required(),
      documents:Joi.array().items(Joi.object({
        name:Joi.string().required(),
        type:Joi.string().required(),
    })),
      fields:Joi.object({
          name:Joi.string().required(),
          value:Joi.string().valid(''),
      }),
    });
  }
  static updateStatus() {
    return Joi.object({
      task: Joi.string().required(),
      status: Joi.string().required(),
    });
  }
  static assignStaff() {
    return Joi.object({
      task: Joi.string().required(),
      status: Joi.string().required(),
    });
  }
  static updateFields() {
    return Joi.object({
      client: Joi.string().required(),
      fields:Joi.object({
          name:Joi.string().required(),
          value:Joi.string(),
      }),
    });
  }
  static updateDocuments() {
    return Joi.object({
      document: Joi.string().required(),
      url:Joi.required(),
    });
  }
}

export default TaskValidator;