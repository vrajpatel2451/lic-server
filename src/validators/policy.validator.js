import Joi from 'joi';

class PolicyMiddleWare {
  static createPolicy() {
    return Joi.object({
      name: Joi.string().required(),
    });
  }
}

export default PolicyMiddleWare;