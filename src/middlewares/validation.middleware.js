import ResponseWrapper from '../helpers/response.helpers';

function validationMiddleware(Validator){
  return async (req, res, next) => {
    const response = new ResponseWrapper(res);
    try {
      if (Validator) {
        await Validator.validateAsync(req.body);
      }
      return next();
    } catch (error) {
      return response.badRequest(error.details[0].message);
    }
  };
}

export default validationMiddleware;