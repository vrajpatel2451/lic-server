import ResponseWraper from "../helpers/response.helpers";
import { Address } from "../models/address.model";
import { Branch } from "../models/branch.model";
import { Client } from "../models/client.model";
import { Comment } from "../models/comment.model";
import { Contact } from "../models/contact.model";
import { Department } from "../models/department.model";
import { DocumentClient } from "../models/document.model";
import { FieldClient } from "../models/fields.model";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";

class TaskController {
    static async createTask(req,res){
        const response = new ResponseWraper(res);
        try {
            const { title,description,fields,deadline,taskType, department, client,staff,head,branch,documents } = req.body;
            let isBranchExist = null;
            isBranchExist = await Branch.findById(branch);
            if(isBranchExist == null) return response.badRequest('Branch Does not Exist');
            let isDepartmentExist = null;
            isDepartmentExist = await Department.findById(department);
            if(isDepartmentExist == null) return response.badRequest('Department Does not Exist');
            let isHeadExist = null;
            isHeadExist = await User.findById(head);
            if(isHeadExist == null) return response.badRequest('Head Does not Exist');
            let isClientExist = null;
            isClientExist = await Client.findById(client);
            if(isClientExist == null) return response.badRequest('Client Does not Exist');
            
        // const newContact = await Contact.create({
        //     email,
        //     phone
        // });
        const fieldsResult = await FieldClient.create(fields)
        const documentsCreated = await DocumentClient.create(documents);
       const clientData = await Client.findByIdAndUpdate(client,{
            $set:{
               fields:fieldsResult 
            },
            $push:{
                documents:documentsCreated
            }
        })
        let task;
            if(staff===null|| staff === undefined || staff === ""){
                task = await Task.create({
                    title,
                    description,
                    startTime: new Date().toISOString(),
                    endTime:deadline,
                    department,
                    branch,
                    head,
                    client:clientData,
                    taskType,
                });
            }else{
                const staffExist = User.findById(staff);
                if(staffExist===null) return response.badRequest('Staff not exist');
                task = await Task.create({
                    title,
                    description,
                    startTime:new Date().toISOString(),
                    endTime:deadline,
                    department,
                    branch,
                    head,
                    staff,
                    client:clientData,
                    taskType,
                });
            }

            return response.created(task);

        } catch (error) {
            console.log('branch error',error);
            return response.internalServerError();
        }
    }
    static async getTaskById(req,res){
        const response = new ResponseWraper(res);
        try {
            let branch = null
            branch = await Task.findById(req.params.id).populate('head',['firstName','lastName'],).populate('staff',['firstName','lastName']).populate('department','name').populate({path:'client',populate:{path:'documents'}}).populate('branch','name').populate({path:'comments',populate:{path:'user'}});
            console.log(branch);
            if(branch==null) return response.notFound('branch does not exist');
            return response.ok(branch);
        } catch (error) {
            console.log(error);
            return response.internalServerError('id is not valid');
        }
    }
    static async getTasks(req,res){
        const response = new ResponseWraper(res);
        try {
            const {department,staff} = req.query;
            let tasks = [];
            if(department!=undefined && department != null && department != "" && staff!=undefined && staff != null && staff != ""){
                console.log('hi3');
                tasks = await Task.find({
                    $or:[
                        {
                            head:staff,
                            staff:staff,
                            department:department,
                        }
                    ]
                }).populate('staff').populate('head').populate('branch').populate('department');
            }else if(department!=undefined && department != null && department != ""){
                console.log('hi2');
                tasks = await Task.find({
                    $or:[
                        {
                            department:department,
                        }
                    ]
                }).populate('staff').populate('head').populate('branch').populate('department');
            }else if(staff!=undefined && staff != null && staff != ""){
                console.log('hi');
                tasks = await Task.find({
                    $or:[
                        {
                            head:staff,
                            // staff:staff,
                        }
                    ]
                }).populate('staff').populate('head').populate('branch').populate('department');
                // console.log(tasksResult);
            }else{
                console.log('hiiiiii');
                tasks = await Task.find().populate('staff').populate('head').populate('branch').populate('department');
            }
            
            if(tasks.length<=0) return response.notFound('Tasks not found');
            return response.ok(tasks);
        } catch (error) {
            return response.internalServerError();
        }
    }
    static async assignStaff(req,res){
        const response = new ResponseWraper(res);
        try {
            const {staff,task} = req.body;
            const taskExist = await Task.findById(task);
            if(taskExist){
                const staffExist = await User.findById(staff);
                if(staffExist === null) return response.badRequest('Staff does not exist');
                await taskExist.update({
                    staff:staffExist
                });
                return response.ok(taskExist);
            }else{
                return response.badRequest('Task does not exist');
            }
            
        } catch (error) {
            return response.internalServerError();
        }
    }
    static async upDateDocument(req,res){
        const response = new ResponseWraper(res);
        try {
            const {url,document} = req.body;
            const documentExist = await DocumentClient.findById(document);
            if(documentExist===null) return response.badRequest('Document does not exist');
            await documentExist.update({
                $push:{
                    image:url
                }
            });   
            return response.ok(documentExist);
        } catch (error) {
            return response.internalServerError();
        }
    }
    static async updateFields(req,res){
        const response = new ResponseWraper(res);
        try {
            const {fields,client} = req.body;
            const clientExist = await Client.findById(client);
            if(clientExist===null) return response.badRequest('Document does not exist');
            await clientExist.update({
                $push:{
                    fields
                }
            });   
            return response.ok(clientExist);
        } catch (error) {
            return response.internalServerError();
        }
    }
    static async updateStatus(req,res){
        const response = new ResponseWraper(res);
        try {
            const {status,task} = req.body;
            const taskExist = await Task.findById(task);
            if(taskExist===null) return response.badRequest('Task does not exist');
            await taskExist.update({
                $push:{
                    taskStatus:status
                }
            });   
            return response.ok(taskExist);
        } catch (error) {
            return response.internalServerError();
        }
    }
    static async addComment(req,res){
        const response = new ResponseWraper(res);
        try {
            const {userId,task,comment} = req.body;
            const taskExist = await Task.findById(task);
            if(taskExist===null) return response.badRequest('Task does not exist');
            // const staffExist = await User.findById(userId);

            const commentResult = await Comment.create({
                comment:comment,
                user:userId,
                task:taskExist
            });
            await taskExist.update({
                $push:{
                    comments:commentResult
                }
            });   
            return response.ok(taskExist);
        } catch (error) {
            return response.internalServerError();
        }
    }
}

export default TaskController;