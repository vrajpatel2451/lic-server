import Joi from 'joi';

class AuthValidator {
  static login() {
    return Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      fcmToken: Joi.string().allow(''),
    });
  }
  static loginWeb() {
    return Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      lat: Joi.number().required(),
      long: Joi.number().required(),
      place:Joi.string().required(''),
    });
  }
  static createUser() {
    return Joi.object({
      email: Joi.string().required().email(),
      phone: Joi.string().required().length(10).pattern(/^[0-9]+$/),
      password: Joi.string().required().min(8).max(15).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    //   userName: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      branch: Joi.string().allow(''),
      role: Joi.string().required(),
      joinDate:Joi.string().required(),
      nomineeFirstName:Joi.string().required(),
      nomineeLastName:Joi.string().required(),
      nomineeRelation:Joi.string().required(),
      nomineePhone:Joi.number().required(),
      // createRole: Joi.string().required(),
      workRole: Joi.array(),
      department: Joi.array(),
      img: Joi.string().required(),
      line1: Joi.string().required(),
      line2: Joi.string(),
      area: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      pin: Joi.number().required().min(100000).max(999999),
    });
  }
  static createAdmin() {
    return Joi.object({
      email: Joi.string().required().email(),
      phone: Joi.string().required().length(10).pattern(/^[0-9]+$/),
      password: Joi.string().required().min(8).max(15).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      line1: Joi.string().required(),
      img:Joi.string().required(),
      line2: Joi.string(),
      area: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      pin: Joi.number().required().min(100000).max(999999),
    });
  }
  static editSingle() {
    return Joi.object({
      staff:Joi.string().required(),
      field: Joi.string().required(),
      value: Joi.string().required(),
    });
  }
  static editList() {
    return Joi.object({
      staff:Joi.string().required(),
      field: Joi.string().required(),
      value: Joi.array().items(Joi.string()),
    });
  }
  static editPassword() {
    return Joi.object({
      staff:Joi.string().required(),
      newPassword: Joi.string().required(),
    });
  }
  static editOwnPassword() {
    return Joi.object({
      cPassword:Joi.string().required(),
      newPassword: Joi.string().required(),
    });
  }
  static createLog() {
    return Joi.object({
      lat: Joi.number().required(),
      long: Joi.number().required(),
      place: Joi.string().required(),
    });
  }
}

export default AuthValidator;