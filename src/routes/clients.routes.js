import { Router } from "express";
import AuthController from "../controllers/auth.controllers";
import BrnachController from "../controllers/branch.controllers";
import ClientController from "../controllers/client.controllers";
import verifyToken from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import AuthValidator from "../validators/auth.validator";
import BranchValidator from "../validators/branch.validator";
import ClientValidator from "../validators/client.validator";

class ClientRoutes{
    router;
    constructor(){
        this.router = Router();
        this.#routes();
    }
    #routes(){
        /**
            * @swagger
            * /client:
            *   post:
            *     summary: Create a client
            *     description: Create a client
            *     responses:
            *       201:
            *         description: A client object.
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
        this.router.post('/', [validationMiddleware(ClientValidator.createClient()),verifyToken], ClientController.createClient);
        /**
            * @swagger
            * /client:
            *   get:
            *     summary: Retrieve a list of client
            *     description: Retrieve a list of client by name,address,branch,department
            *     responses:
            *       200:
            *         description: A client object.
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
        this.router.get('/', verifyToken, ClientController.getClients);
        /**
            * @swagger
            * /client/:id:
            *   get:
            *     summary: Retrieve a client
            *     description: Retrieve a client by id
            *     responses:
            *       200:
            *         description: A client object.
            *         content:
            *           application/json:
            *             schema:
            *               type: object
            *               properties:
            *                 data:
            *                   type: obj
            *                 sucees:
            *                   type: bool  
            *                 error:
            *                   type: object  
        */
        this.router.get('/:id', verifyToken, ClientController.getClientById);
    }
}

export default ClientRoutes;