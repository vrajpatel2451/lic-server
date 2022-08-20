import { Router } from "express";
import AuthController from "../controllers/auth.controllers";
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
        /**
            * @swagger
            * /auth/register:
            *   post:
            *     summary: Register a user
            *     description:
            *     requestBody:
            *       required: true
            *       content:
            *         application/json:
            *           schema:
            *             type: object
            *             properties:
            *               firstName:
            *                 type: string
            *                 description: The user's name.
            *                 example: Leanne Graham 
            *               lastName:
            *                 type: string
            *                 description: The user's name.
            *                 example: Leanne Graham 
            *               email:
            *                 type: string
            *                 description: The user's name.
            *                 example: Leanne Graham 
            *               phone:
            *                 type: string
            *                 description: The user's name.
            *                 example: Leanne Graham 
            *     responses:
            *       201:
            *         description: A staff object.
            *         content:
            *           application/json:
            *             schema:
            *               type: object
            *               properties:
            *                 data:
            *                   type: object
            *                 sucees:
            *                   type: bool  
            *                 error:
            *                   type: object  
        */
        this.router.post('/register', validationMiddleware(AuthValidator.createUser()), AuthController.register);
        /**
            * @swagger
            * /auth/login:
            *   post:
            *     summary: Login a user
            *     description: 
            *     responses:
            *       200:
            *         description: A staff object.
            *         content:
            *           application/json:
            *             schema:
            *               type: object
            *               properties:
            *                 data:
            *                   type: object
            *                 sucees:
            *                   type: bool  
            *                 error:
            *                   type: object  
        */
        this.router.post('/login', validationMiddleware(AuthValidator.login()), AuthController.login);
        /**
            * @swagger
            * /auth/staff:
            *   get:
            *     summary: Retrieve a list of staff
            *     description: Retrieve a list of staff by name,department,branch
            *     responses:
            *       200:
            *         description: A staff object.
            *         content:
            *           application/json:
            *             schema:
            *               type: object
            *               properties:
            *                 data:
            *                   type: array
            *                 sucees:
            *                   type: bool  
            *                 error:
            *                   type: object  
        */
        this.router.get('/staff', verifyToken, AuthController.getStaff);
    }
}

export default AuthRoutes;