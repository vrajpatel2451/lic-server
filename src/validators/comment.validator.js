import Joi from 'joi';

class CommentValidator {
  static createDepartment() {
    return Joi.object({
      comment: Joi.string().required(),
      user: Joi.string().required(),
      task: Joi.string().required(),
    });
  }
}

export default CommentValidator;