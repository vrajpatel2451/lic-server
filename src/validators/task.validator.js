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
      staff: Joi.string().allow(''),
      client: Joi.string().required(),
      taskType:Joi.string().required(),
      documents:Joi.array().items(Joi.object({
        name:Joi.string().required(),
        type:Joi.string().required(),
    })),
      fields:Joi.array().items(Joi.object({
          label:Joi.string().required(),
          value:Joi.string().allow(''),
          type:Joi.string().required(),
      })),
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
      staff: Joi.string().required(),
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
      image:Joi.string().required(),
      document:Joi.string().required(),
    });
  }
  static addComment() {
    return Joi.object({
      comment: Joi.string().required(),
      task:Joi.string().required(),
    });
  }
}

export default TaskValidator;