import Joi from 'joi';

class ClientValidator {
  static createClient() {
    return Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      familyCode: Joi.string().required(),
      line1: Joi.string().required(),
      line2: Joi.string(),
      area: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      pin: Joi.number().required().min(100000).max(999999),
      branch: Joi.string().required(),
      policies: Joi.array().required(),
      birthDate:Joi.date().required(),
      meetingDate:Joi.date().required(),
      email: Joi.string().required().email(),
      phone: Joi.string().required().length(10).pattern(/^[0-9]+$/),
    });
  }
}

export default ClientValidator;