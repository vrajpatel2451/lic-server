import { Router } from "express";
import TaskController from "../controllers/task.controllers";
import verifyToken, { roleFinder } from "../middlewares/auth.middleware";
import { uploadTaskFile } from "../middlewares/task.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import TaskValidator from "../validators/task.validator";

class TaskRoutes{
    router;
    constructor(){
        this.router = Router();
        this.#routes();
    }
    #routes(){
        this.router.post('/', [validationMiddleware(TaskValidator.createTask()) ,verifyToken], TaskController.createTask);
        
        this.router.get('/', verifyToken, TaskController.getTasks);
        this.router.get('/history', verifyToken, TaskController.getTasksHistory);
        this.router.get('/dashboard', [verifyToken,roleFinder(['admin'])], TaskController.getTaskCount);
        
        this.router.get('/:id', verifyToken, TaskController.getTaskById);
        
        this.router.patch('/fields', [validationMiddleware(TaskValidator.updateFields()), verifyToken], TaskController.updateFields);
        
        this.router.patch('/documents', [uploadTaskFile,validationMiddleware(TaskValidator.updateDocuments()), verifyToken], TaskController.upDateDocument);
        
        this.router.patch('/status', [validationMiddleware(TaskValidator.updateStatus()), verifyToken], TaskController.updateStatus);
        
        this.router.patch('/assign', [validationMiddleware(TaskValidator.assignStaff()), verifyToken], TaskController.assignStaff);
        this.router.patch('/editClient', [validationMiddleware(TaskValidator.editCLientDetails()), verifyToken], TaskController.updateFieldOfClient);
        this.router.patch('/assignhead', [validationMiddleware(TaskValidator.assignStaff()), verifyToken], TaskController.assignHead);
        this.router.patch('/comment', [validationMiddleware(TaskValidator.addComment()), verifyToken], TaskController.addComment);
    }
}

export default TaskRoutes;