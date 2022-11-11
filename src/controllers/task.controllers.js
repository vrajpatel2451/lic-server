import mongoose from "mongoose";
import FirebaseNotificationService from "../helpers/notification.helper";
import ResponseWraper from "../helpers/response.helpers";
import { Branch } from "../models/branch.model";
import { Client } from "../models/client.model";
import { Comment } from "../models/comment.model";
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
            console.log(req.body);
            isBranchExist = await Branch.findById(branch);
            if(isBranchExist == null) return response.badRequest('Branch Does not Exist');
            let isDepartmentExist = null;
            isDepartmentExist = await Department.findById(department);
            if(isDepartmentExist == null) return response.badRequest('Department Does not Exist');
            let isHeadExist = null;
            isHeadExist = await User.findById(head);
            if(isHeadExist == null) return response.badRequest('Head Does not Exist');
            let isStaffExist = null;
            // if(isHeadExist == null) return response.badRequest('Head Does not Exist');
            let isClientExist = null;
            isClientExist = await Client.findById(client);
            if(isClientExist == null) return response.badRequest('Client Does not Exist');
            
        // const newContact = await Contact.create({
        //     email,
        //     phone
        // });
        const fieldsResult = await FieldClient.create(fields)
        const documentsCreated = await DocumentClient.insertMany(documents);
       const clientData = await Client.findByIdAndUpdate(client,{
            $push:{
                documents:documentsCreated
            }
        })

        let finalDeadline = '';
        if(deadline==='' || deadline === undefined || deadline==null){
            const newDeadline = new Date();
            if(isDepartmentExist.unitTask==='days'){
                newDeadline.setDate(newDeadline.getDate()+isDepartmentExist.durationTask);
            }else{
                newDeadline.setDate(newDeadline.getHours()+isDepartmentExist.durationTask);
            }
            finalDeadline = newDeadline.toISOString();
        }else{
            finalDeadline = deadline;
        }

            let task;
            if(staff===null|| staff === undefined || staff === ""){
                task = await Task.create({
                    title,
                    description,
                    startTime: new Date().toISOString(),
                    endTime: finalDeadline,
                    department,
                    branch,
                    fields:fieldsResult,
                    head,
                    client:clientData,
                    taskType,
                    documents:documentsCreated
                });
            }else{
                isStaffExist = await User.findById(staff);
                if(isStaffExist===null) return response.badRequest('Staff not exist');
                task = await Task.create({
                    title,
                    description,
                    startTime:new Date().toISOString(),
                    endTime:finalDeadline,
                    department,
                    branch,
                    taskStatus:'inprogress',
                    head,
                    staff,
                    fields:fieldsResult,
                    client:clientData,
                    taskType,
                    documents:documentsCreated
                });
            }
            const endtimeNow = new Date(deadline);
            endtimeNow.setHours(endtimeNow.getHours()-5);
            const admins = await User.find({
                role:'admin'
            });
            await new FirebaseNotificationService().sendNotification(isHeadExist?.fcmToken,'Task Assigned to you','Please finish this task','1',task._id);
            if(isStaffExist!=null){
                await new FirebaseNotificationService().sendNotification(isStaffExist?.fcmToken,'Task Assigned to you','Please finish this task','1',task._id);
            }
            await global.agenda.schedule(endtimeNow, 'task reminder', {isHeadExist,isStaffExist,admins,task,}); 
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
            branch = await Task.findById(req.params.id).populate('head', ['firstName', 'lastName'],).populate('staff', ['firstName', 'lastName']).populate('department', 'name').populate('client').populate('branch', 'name').populate({ path: 'comments', populate: { path: 'user' } }).populate('documents').populate('fields');
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
            const {department,staff,head,fromAdmin} = req.query;
            let tasks = [];
            if(department!=undefined && department != null && department != "" && staff!=undefined && staff != null && staff != ""){
                console.log('hi3');
                tasks = await Task.find({
                    $nor:[{
                        taskStatus:'completed'
                    }],
                    $or:[
                        {
                            // head:head,
                            staff:staff,
                            department:department,
                        }
                    ]
                }).populate('staff').populate('head').populate('branch').populate('department').populate('fields').sort('endTime');
            }else if(department!=undefined && department != null && department != ""&& head!=undefined && head != null && head != ""){
                tasks = await Task.find({
                    $nor:[{
                        taskStatus:'completed'
                    }],
                    $or:[
                        {
                            head:head,
                            // staff:staff,
                            department:department,
                        }
                    ]
                }).populate('staff').populate('head').populate('branch').populate('department').populate('fields').sort('endTime');

            }else if(department!=undefined && department != null && department != ""){
                console.log('hi2');
                tasks = await Task.find({
                    $nor:[{
                        taskStatus:'completed'
                    }],
                    $or:[
                        {
                            department:department,
                        }
                    ]
                }).populate('staff').populate('head').populate('branch').populate('department').populate('fields').sort('endTime');
            }else if(staff!=undefined && staff != null && staff != ""){
                    console.log('hi astaff');
                    tasks = await Task.find({
                        $nor:[{
                            taskStatus:'completed'
                        }],
                        $or:[
                            {
                                // head:staff,
                                staff:staff,
                            }
                        ]
                    }).populate('staff').populate('head').populate('branch').populate('department').populate('fields').sort('endTime');
            
                // console.log(tasksResult);
            }else if(head!=undefined && head != null && head != ""){
                console.log('hi');
                tasks = await Task.find({
                    $nor:[{
                        taskStatus:'completed'
                    }],
                    $or:[
                        {
                            head:head,
                            // staff:staff,
                        }
                    ]
                }).populate('staff').populate('head').populate('branch').populate('department').populate('fields').sort('endTime');
                // console.log(tasksResult);
            }else{
                console.log('hiiiiii');
                tasks = await Task.find({
                    $nor:[{
                        taskStatus:'completed'
                    }],
                }).populate('staff').populate('head').populate('branch').populate('department').populate('fields').sort('endTime');
            }
            
            if(tasks.length<=0) return response.notFound('Tasks not found');

            // const priorityTasks = tasks.map(e=>{
                
                // priorityTasks.push({...e,priority:status});
            //     return {...e,priority:status}
            // });
            return response.ok(tasks);
        } catch (error) {
            console.log(error);
            return response.internalServerError();
        }
    }
    static async getTasksHistory(req,res){
        const response = new ResponseWraper(res);
        try {
            const {createRole,userId} = req.body;
            let tasks = [];
            // console.log(createRole);
            if(createRole==='admin'){
                tasks = await Task.find({
                    taskStatus:'completed'
                }).populate('staff').populate('head').populate('branch').populate('department').sort('endTime');
            }else if(createRole==='head'){
                tasks = await Task.find({
                    taskStatus:'completed',
                    head:userId
                }).populate('staff').populate('head').populate('branch').populate('department').sort('endTime');
            }else{
                console.log('here');
                tasks = await Task.find({
                    taskStatus:'completed',
                    staff:userId
                }).populate('staff').populate('head').populate('branch').populate('department').sort('endTime');
            }

            if(tasks.length<=0) return response.notFound('Tasks not found');
            
            

            return response.ok(tasks);
        } catch (error) {
            return response.internalServerError();
        }
    }
    static async getTaskCount(req,res){
        const response = new ResponseWraper(res);
        try {
            const {createRole,userId} = req.body;
            let task = {
                completed:0,
                pending:0,
                inprogress:0,
                verify:0
            }

            task.completed = await Task.count({
                taskStatus:'completed'
            });
            task.pending = await Task.count({
                taskStatus:'pending'
            });
            task.inprogress = await Task.count({
                taskStatus:'inprogress'
            });
            task.verify = await Task.count({
                taskStatus:'verify'
            });
            return response.ok(task);
        } catch (error) {
            console.log(error);
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
                    staff:staffExist,
                    taskStatus:'inprogress'
                });
                const endtimeNow = new Date(taskExist.endTime)
                endtimeNow.setHours(endtimeNow.getHours()-5);
                await new FirebaseNotificationService().sendNotification(staffExist.fcmToken,'Task Assigned','Please finish this task','1',taskExist._id);

            await global.agenda.schedule(endtimeNow, 'task reminder', {isHeadExist:null,isStaffExist:staffExist,admins:null,task:taskExist,});
                return response.ok(taskExist);
            }else{
                return response.badRequest('Task does not exist');
            }
            
        } catch (error) {
            return response.internalServerError();
        }
    }
    static async assignHead(req,res){
        const response = new ResponseWraper(res);
        try {
            const {head,task} = req.body;
            const taskExist = await Task.findById(task);
            if(taskExist){
                const staffExist = await User.findById(head);
                if(staffExist === null) return response.badRequest('Staff does not exist');
                await taskExist.update({
                    head:staffExist,
                });
                // const endtimeNow = new Date(taskExist.endTime)
                // endtimeNow.setHours(endtimeNow.getHours()-5);
                await new FirebaseNotificationService().sendNotification(staffExist.fcmToken,'Task Assigned','Please check this task','1',taskExist._id);

            await global.agenda.schedule(endtimeNow, 'task reminder', {isHeadExist:staffExist,isStaffExist:null,admins:null,task:taskExist,});
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
            const {document,image} = req.body;
            console.log('doc',document);
            console.log('image',image);
            const documentExist = await DocumentClient.findByIdAndUpdate(document,{
                uploaded:true,
                $set:{
                    image
                }
                // $push:{
                //     image,
                // }
            })   
            return response.ok(documentExist);
        } catch (error) {
            console.log(error);
            return response.internalServerError();
        }
    }
    static async updateFields(req,res){
        const response = new ResponseWraper(res);
        try {
            const {field,value} = req.body;
            // const clientExist = await Client.findById(client);
            // if(clientExist===null) return response.badRequest('Document does not exist');
            // await clientExist.update({
            //     $push:{
            //         fields
            //     }
            // });  
            const updated = await FieldClient.findByIdAndUpdate(field,{
                $set:{
                    value
                }
            }) 
            return response.ok(updated);
        } catch (error) {
            return response.internalServerError();
        }
    }
    static async updateStatus(req,res){
        const response = new ResponseWraper(res);
        try {
            const {status,task,userId} = req.body;
            const taskExist = await Task.findByIdAndUpdate(task,{
                taskStatus:status
            })   
            return response.ok(taskExist);
        } catch (error) {
            return response.internalServerError();
        }
    }
    static async addComment(req,res){
        const response = new ResponseWraper(res);
        try {
            const {userId,task,comment,createRole} = req.body;
            const taskExist = await Task.findById(task);
            if(taskExist===null) return response.badRequest('Task does not exist');
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
            const noti = await (await taskExist.populate('staff')).populate('head');
            const admins = await User.find({
                role:'admin'
            });
            console.log('hhahah',createRole);
            if(createRole!=='admin'){
                admins.forEach(async e=>{
                    await new FirebaseNotificationService().sendNotification(e.fcmToken,`Comment By added for task`,'Check this task for the comment','1',taskExist._id);   
                });
            }
            if(createRole!=='head'){
                console.log('head noti',taskExist?.head);
                await new FirebaseNotificationService().sendNotification(noti?.head?.fcmToken,`Comment By added for task`,'Check this task for the comment','1',taskExist._id);   
            }
            if(createRole!=='staff'){
                console.log('staff noti',taskExist?.staff);
                await new FirebaseNotificationService().sendNotification(noti?.staff?.fcmToken,`Comment added for task`,'Check this task for the comment','1',taskExist._id);   
            }
            return response.ok(noti);
        } catch (error) {
            console.log(error);
            return response.internalServerError();
        }
    }
}

export default TaskController;