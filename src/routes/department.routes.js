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
        this.router.post('/', [validationMiddleware(DepartmentValidator.createDepartment()),verifyToken], DepartmentController.createDepartment);
        this.router.get('/', verifyToken, DepartmentController.getDepartmentsByName);
        this.router.get('/:id', verifyToken, DepartmentController.getDepartmentById);
    }
}

export default DepartmentRoutes;