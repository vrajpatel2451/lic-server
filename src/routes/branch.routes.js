import { Router } from "express";
import AuthController from "../controllers/auth.controller";
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
        this.router.post('/', [validationMiddleware(BranchValidator.createBranch()),verifyToken], BrnachController.createBranch);
        this.router.get('/', verifyToken, BrnachController.getBranchByBranchCode);
        this.router.get('/:id', verifyToken, BrnachController.getBranchById);
    }
}

export default BranchRoutes;