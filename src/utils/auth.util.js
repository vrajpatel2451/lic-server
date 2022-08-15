import jwt from 'jsonwebtoken';

export function createToken(user){
    const { _id: id, email } = user;
    return jwt.sign(
      {
        email,
        // eslint-disable-next-line no-underscore-dangle
        id,
        exp: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 24 * 60 * 60,
      },
    );
  }
  
  export const JWTVerify = (authorization, callback) => {
    const token = authorization.replace(/bearer /i, '');
  
    jwt.verify(token, process.env.JWT_SECRET, callback);
  };
  
  export function verifyToken(req, res, next) {
    const { token } = req.headers;
    if (!token) {
      res.status(403).send({ auth: false, message: 'No token provided.' });
      return;
    }
    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        return;
      }
      req.userId = decoded.id;
      next();
    });
  }