import { Router } from "express";
import WrokRoleController from "../controllers/workRole.cotroller";
import verifyToken from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import WorkRoleValidator from "../validators/workrole.validator";

class WorkRoleRoutes{
    router;
    constructor(){
        this.router = Router();
        this.#routes();
    }
    #routes(){
        /**
            * @swagger
            * /workroles:
            *   get:
            *     summary: Retrieve a list of department
            *     description: Retrieve a list of department by name,branch
            *     responses:
            *       200:
            *         description: A department object.
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
        this.router.get('/', verifyToken, WrokRoleController.getWorkRoles);
        /**
            * @swagger
            * /workroles/:id:
            *   get:
            *     summary: Retrieve a department
            *     description: Retrieve a department by id
            *     responses:
            *       200:
            *         description: A department object.
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
        this.router.get('/:id', verifyToken, WrokRoleController.getWorkRoleById);
        this.router.post('/', [validationMiddleware(WorkRoleValidator.createWorkRole()),verifyToken], WrokRoleController.addWorkRole);
    }
}

export default WorkRoleRoutes;