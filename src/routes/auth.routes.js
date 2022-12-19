import { Router } from "express";
import AuthController from "../controllers/auth.controllers";
import verifyToken, { roleFinder, roleMaker, uploadUserFile, uploadUserFileToServer, verifySuperUser } from "../middlewares/auth.middleware";
import locationMiddleware from "../middlewares/location.middleware";
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
        this.router.post('/register/admin', [verifySuperUser,uploadUserFile,validationMiddleware(AuthValidator.createAdmin())], AuthController.createAdmin);
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
        this.router.post('/register', [verifyToken,roleFinder(['admin']),uploadUserFile,validationMiddleware(AuthValidator.createUser())], AuthController.register);
        /**
            * @swagger
            * /auth/login/staff:
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
       this.router.post('/login/web/:role', [locationMiddleware,validationMiddleware(AuthValidator.loginWeb()),roleMaker(),roleFinder(['admin'])], AuthController.loginWeb);
       this.router.post('/login/:role', [validationMiddleware(AuthValidator.login()),roleMaker(),roleFinder()], AuthController.login);
       this.router.get('/logs', [verifyToken,roleFinder(['admin'])], AuthController.getAdminLog);
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
        this.router.get('/staff', [verifyToken,roleFinder(['admin','head'])], AuthController.getStaff);
        this.router.patch('/staff/single', [validationMiddleware(AuthValidator.editSingle()),verifyToken,roleFinder(['admin'])], AuthController.editSingle);
        this.router.patch('/staff/list', [validationMiddleware(AuthValidator.editList()),verifyToken,roleFinder(['admin'])], AuthController.editSingle);
        this.router.patch('/staff/password', [validationMiddleware(AuthValidator.editPassword()),verifyToken,roleFinder(['admin'])], AuthController.editPassword);
        this.router.patch('/staff/password/admin', [validationMiddleware(AuthValidator.editOwnPassword()),verifyToken,roleFinder(['admin'])], AuthController.editOwnPassword);
        this.router.get('/staff/web', [verifyToken,roleFinder(['admin','head'])], AuthController.getStaffByWeb);
        this.router.get('/staff/:id', [verifyToken], AuthController.getStaffById);
        /**
            * @swagger
            * /auth/verify/admin:
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
        this.router.get('/verify/admin', [verifyToken,roleFinder(['admin'])], AuthController.verifyToken);
        /**
            * @swagger
            * /auth/verify/head:
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
        this.router.get('/verify/head',[verifyToken,roleFinder(['head'])], AuthController.verifyToken);
        /**
            * @swagger
            * /auth/verify/staff:
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
        this.router.get('/verify/staff',[verifyToken,roleFinder(['staff'])], AuthController.verifyToken);
        this.router.get('/log',[verifyToken,roleFinder(['admin'])], AuthController.getStaffLog);
        this.router.post('/log',[validationMiddleware(AuthValidator.createLog()),verifyToken,roleFinder(['staff'])], AuthController.createStaffLog);
    }
}

export default AuthRoutes;