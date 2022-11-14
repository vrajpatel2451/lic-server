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
        /**
            * @swagger
            * /task:
            *   post:
            *     summary: create task
            *     description: create task 
            *     responses:
            *       201:
            *         description: A task object.
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
        this.router.post('/', [validationMiddleware(TaskValidator.createTask()) ,verifyToken], TaskController.createTask);
        /**
            * @swagger
            * /task:
            *   get:
            *     summary: get list of task
            *     description: get list of task by department,branch,staff 
            *     responses:
            *       200:
            *         description: A task list.
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
        this.router.get('/', verifyToken, TaskController.getTasks);
        this.router.get('/history', verifyToken, TaskController.getTasksHistory);
        this.router.get('/dashboard', [verifyToken,roleFinder(['admin'])], TaskController.getTaskCount);
        /**
            * @swagger
            * /task/:id:
            *   get:
            *     summary: get task
            *     description: get task by id 
            *     responses:
            *       200:
            *         description: A task object.
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
        this.router.get('/:id', verifyToken, TaskController.getTaskById);
        /**
            * @swagger
            * /task/fields:
            *   patch:
            *     summary: update fields
            *     description: create fields of clients 
            *     responses:
            *       200:
            *         description: A task object.
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
        this.router.patch('/fields', [validationMiddleware(TaskValidator.updateFields()), verifyToken], TaskController.updateFields);
        /**
            * @swagger
            * /task/documents:
            *   patch:
            *     summary: add documents
            *     description: add documents of client 
            *     responses:
            *       200:
            *         description: A task object.
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
        this.router.patch('/documents', [uploadTaskFile,validationMiddleware(TaskValidator.updateDocuments()), verifyToken], TaskController.upDateDocument);
        /**
            * @swagger
            * /task/status:
            *   patch:
            *     summary: update status
            *     description: update status of task 
            *     responses:
            *       200:
            *         description: A task object.
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
        this.router.patch('/status', [validationMiddleware(TaskValidator.updateStatus()), verifyToken], TaskController.updateStatus);
        /**
            * @swagger
            * /task/assign:
            *   patch:
            *     summary: assign staff
            *     description: assign task to the staff 
            *     responses:
            *       200:
            *         description: A task object.
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
        this.router.patch('/assign', [validationMiddleware(TaskValidator.assignStaff()), verifyToken], TaskController.assignStaff);
        this.router.patch('/editClient', [validationMiddleware(TaskValidator.editCLientDetails()), verifyToken], TaskController.updateFieldOfClient);
        this.router.patch('/assignhead', [validationMiddleware(TaskValidator.assignStaff()), verifyToken], TaskController.assignHead);
        this.router.patch('/comment', [validationMiddleware(TaskValidator.addComment()), verifyToken], TaskController.addComment);
    }
}

export default TaskRoutes;