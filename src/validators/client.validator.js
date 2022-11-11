import Joi from 'joi';

class ClientValidator {
  static createClient() {
    return Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      reference: Joi.string().allow(''),
      email:Joi.string().required().email(),
      phone:Joi.number().required(),
      gender:Joi.string().required(),
      maritalStatus:Joi.string().required(),
      motherName:Joi.string().required(),
      fatherName:Joi.string().required(),
      spouse:Joi.string().required(),
      children:Joi.number().required(),
      birthPlace:Joi.string().required(),
      income:Joi.number().required(),
      occupation:Joi.string().required(),
      nomineeName:Joi.string().required(),
      nomineeRelation:Joi.string().required(),
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
      name:Joi.string().required(),
      type:Joi.string().required(),
      taskDoc:Joi.string().allow(''),
      update:Joi.date().default(new Date().toISOString())
    });
  }
}

export default ClientValidator;