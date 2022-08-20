import { Router } from "express";
import AuthController from "../controllers/auth.controllers";
import BrnachController from "../controllers/branch.controllers";
import verifyToken from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import AuthValidator from "../validators/auth.validator";
import BranchValidator from "../validators/branch.validator";

class BranchRoutes{
    router;
    constructor(){
        this.router = Router();
        this.#routes();
    }
    #routes(){
        /**
            * @swagger
            * /brnach:
            *   post:
            *     summary: Crate Branch
            *     description: Crate Branch
            *     responses:
            *       201:
            *         description: A branch object.
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
        this.router.post('/', [validationMiddleware(BranchValidator.createBranch()),verifyToken], BrnachController.createBranch);
        /**
            * @swagger
            * /branch:
            *   get:
            *     summary: Retrieve a list of branch
            *     description: Retrieve a list of branch by name,branchCode
            *     responses:
            *       200:
            *         description: A branch object.
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
        this.router.get('/', verifyToken, BrnachController.getBranchByBranchCode);
        /**
            * @swagger
            * /brnach/:id:
            *   get:
            *     summary: Retrieve a branch
            *     description: Retrieve a list of branch by id
            *     responses:
            *       200:
            *         description: A branch object.
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
        this.router.get('/:id', verifyToken, BrnachController.getBranchById);
    }
}

export default BranchRoutes;