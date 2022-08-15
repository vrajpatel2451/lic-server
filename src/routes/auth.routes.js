import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import verifyToken from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import AuthValidator from "../validators/auth.validator";

class AuthRoutes{
    router;
    constructor(){
        this.router = Router();
        this.#routes();
    }
    #routes(){
        this.router.post('/register', validationMiddleware(AuthValidator.createUser()), AuthController.register);
        this.router.post('/login', validationMiddleware(AuthValidator.login()), AuthController.login);
        this.router.get('/staff', verifyToken, AuthController.getStaff);
    }
}

export default AuthRoutes;