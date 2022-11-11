import Joi from 'joi';

class ClientValidator {
  static createClient() {
    return Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      reference: Joi.string().allow(''),
      familyCode: Joi.string().allow(''),
      birthDate:Joi.string().allow('').default(new Date().toISOString()),
      meetingDate:Joi.string().allow('').default(new Date().toISOString()),
      fields:Joi.array().items(Joi.object({
        label:Joi.string().required(),
        value:Joi.string().allow(''),
        type:Joi.string().required(),
        update:Joi.string().required(),
      }),),
      documents:Joi.array().items(Joi.object({
        name:Joi.string().required(),
        type:Joi.string().required(),
    })),
    });
  }
  static addFields() {
    return Joi.object({
      client:Joi.string().required(),
      fields:Joi.object({
        label:Joi.string().required(),
        value:Joi.string().allow(''),
        type:Joi.string().required(),
        update:Joi.string().required(),
      }),
    });
  }
  static addDocuments() {
    return Joi.object({
      client:Joi.string().required(),
      documents:Joi.array().items(Joi.object({
        name:Joi.string().required(),
        type:Joi.string().required(),
    })),
    });
  }
}

export default ClientValidator;