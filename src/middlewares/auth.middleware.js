import { JWTVerify } from '../utils/auth.util';
import ResponseWrapper from '../helpers/response.helpers';

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  const response = new ResponseWrapper(res);

  if (!authorization) {
    response.forbidden('No token provided!');
    return;
  }

  JWTVerify(authorization, (err, decoded) => {
    if (err) {
      response.unauthorized('Invalid Token!');
      return;
    }
    const body = { ...req.body, userId: decoded.id };
    req.body = body;
    next();
  });
};

export default verifyToken;