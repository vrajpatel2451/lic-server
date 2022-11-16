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
    basicFields:Joi.array().items(Joi.object({
      name:Joi.string().valid('firstName','lastName','phone','email','gender','maritalStatus','fatherName','motherName','spouse','children','birthPlace','income','occupation','nomineeName','nomineeRelation','birthDate','meetingDate'),
      type:Joi.string().valid('string','number','date-time')
    })),
      fields:Joi.array().items(Joi.object({
        label:Joi.string().required(),
        type:Joi.string().required(),
    })),
      // fields:Joi.array().items(Joi.string().required()),
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
  static editCLientDetails() {
    return Joi.object({
      fieldName: Joi.string().required().valid('firstName','lastName','phone','email','gender','maritalStatus','fatherName','motherName','spouse','children','birthPlace','income','occupation','nomineeName','nomineeRelation','birthDate','meetingDate'),
      fieldType: Joi.string().required().valid('string','number','date-time'),
      fieldValue: Joi.string().required(),
      client: Joi.string().required(),
    });
  }
  static updateFields() {
    return Joi.object({
      value: Joi.string().required(),
      update: Joi.string().allow(''),
      field:Joi.string().required(),
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