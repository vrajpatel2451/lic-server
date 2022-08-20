import { Router } from "express";
import BrnachController from "../controllers/branch.controllers";
import DepartmentController from "../controllers/department.controllers";
import verifyToken from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import DepartmentValidator from "../validators/department.validation";

class DepartmentRoutes{
    router;
    constructor(){
        this.router = Router();
        this.#routes();
    }
    #routes(){
        /**
            * @swagger
            * /department:
            *   post:
            *     summary: Create a Department
            *     description: Create a Department
            *     responses:
            *       201:
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
        this.router.post('/', [validationMiddleware(DepartmentValidator.createDepartment()),verifyToken], DepartmentController.createDepartment);
        /**
            * @swagger
            * /department:
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
        this.router.get('/', verifyToken, DepartmentController.getDepartmentsByName);
        /**
            * @swagger
            * /department/:id:
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
        this.router.get('/:id', verifyToken, DepartmentController.getDepartmentById);
    }
}

export default DepartmentRoutes;