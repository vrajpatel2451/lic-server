import FirebaseNotificationService from "../helpers/notification.helper";
import ResponseWraper from "../helpers/response.helpers";
import SearchHelper from "../helpers/searchindexing.helpers";
import { Client } from "../models/client.model";
import { DocumentClient } from "../models/document.model";
import { FieldClient } from "../models/fields.model";
import { Latest } from "../models/latest.model";
import { User } from "../models/user.model";

class ClientController {
    static async createClient(req,res){
        const response = new ResponseWraper(res);
        try {
            const { firstName,email,phone,gender,maritalStatus,motherName,fatherName,spouse,children,birthPlace,income,occupation,nomineeName,nomineeRelation, lastName, policies,familyCode,meetingDate,birthDate,fields } = req.body;
            console.log(policies);
        const createdFields = await FieldClient.insertMany(fields);
        
        const latest = await Latest.findOne({},{},{sort:{'created_at':-1}});
        let newFamilyCode;
        if(familyCode==='' || familyCode === undefined || familyCode == null){
            if(latest){
                const creCode = await Latest.create({countNum:latest.countNum+1});
                newFamilyCode = creCode.countNum;
            }else{
                const creCode = await Latest.create({countNum:1});
                newFamilyCode = creCode.countNum;
            }
        }else{
            newFamilyCode = familyCode;
        }
        
        const client = await Client.create({
                firstName,
                lastName,
                email,
                phone,
                gender,
                spouse,
                motherName,
                fatherName,
                children,
                maritalStatus,
                birthPlace,
                income,
                occupation,
                nomineeName,
                nomineeRelation,
                familyCode:newFamilyCode,
                meetingDate,
                birthDate,
                policies,
                fields:createdFields,
                followUpDate:new Date().toISOString()
            });
            const clData = await client.populate('fields');
            // const dta = await new SearchHelper().addIndex(clData);
            // console.log('search', dta);
            const now = new Date()
            const endtimeNow = new Date(meetingDate);
            endtimeNow.setDate(endtimeNow.getDate()-1);
            const admins = await User.find({
                role:'admin'
            });
            if(endtimeNow>now){
                setTimeout(async()=>{
                    admins.forEach(async e=>{
                        await new FirebaseNotificationService().sendNotification(e.fcmToken,'Client Meeting set','Follow up client for their details');
                    });
                    // console.log('called');
                },endtimeNow-now)
            }
            return response.created(clData);

        } catch (error) {
            console.log('branch error',error);
            return response.internalServerError();
        }
    }
    static async createField(req,res){
        const response = new ResponseWraper(res);
        try {
            console.log('called');
            const { fields,client } = req.body;
            console.log(client);
        const createdFields = await FieldClient.create(fields);
        console.log(createdFields);
            const clientData = await Client.findByIdAndUpdate(client,{
                $addToSet:{
                    fields:createdFields
                }
            },{new:true});
            const clData = await clientData.populate('fields');
            // await new SearchHelper().addIndex(clData);
            return response.created(clData);

        } catch (error) {
            console.log('branch error',error);
            return response.internalServerError();
        }
    }
    static async createDocuments(req,res){
        const response = new ResponseWraper(res);
        try {
            console.log('called');
            const {client,name,type,taskDoc,update } = req.body;
            console.log('client aayo',client);
            // console.log('lund',req.file);
        const createdFields = await DocumentClient.create({
            client,
            name,
            type,
            image:taskDoc,
            uploaded:req.file? true:false
        });
        console.log(createdFields);
            const clientData = await Client.findByIdAndUpdate(client,{
                $addToSet:{
                    documents:createdFields
                }
            },{new:true});
            const clData = await clientData.populate('fields');
            // await new SearchHelper().addIndex(clData);
            return response.created(clData);

        } catch (error) {
            console.log('branch error',error);
            return response.internalServerError();
        }
    }
    static async getClientById(req,res){
        const response = new ResponseWraper(res);
        try {
            // let branch = null
            const branch = await Client.findById(req.params.id).populate('fields').populate('documents');
            console.log(branch);
            if(branch==null) return response.notFound('client does not exist');
            return response.ok(branch);
        } catch (error) {
            console.log(error);
            return response.internalServerError('id is not valid');
        }
    }
    static async updateClientStatus(req,res){
        const response = new ResponseWraper(res);
        try {
            // let branch = null
            const {id,status} = req.body;
            const branch = await Client.findByIdAndUpdate(id,{status,joinDate: new Date().toISOString()});
            // console.log(branch);
            // if(branch==null) return response.notFound('client does not exist');
            return response.ok(branch);
        } catch (error) {
            console.log(error);
            return response.internalServerError('id is not valid');
        }
    }
    static async getClientByWebId(req,res){
        const response = new ResponseWraper(res);
        try {
            // let branch = null
            const branch = await Client.findById(req.params.id).populate('documents').populate('fields');
            const clients = await Client.find({familyCode:branch.familyCode}).populate('fields').populate('documents');
            console.log(branch);
            if(branch==null) return response.notFound('client does not exist');
            return response.ok({client:branch,related:clients});
        } catch (error) {
            console.log(error);
            return response.internalServerError('id is not valid');
        }
    }
    static async getClients(req,res){
        const response = new ResponseWraper(res);
        try {
            const {name} = req.query;
            const clients = await Client.find({
                $or:[
                    {
                        firstName:{ $regex: new RegExp(`.*${name??''}.*`), $options: "i" }
                    }
                ]
            }).populate('fields');
            
            if(clients.length<=0) return response.notFound('Clients not found');
            return response.ok(clients);
        } catch (error) {
            return response.internalServerError();
        }
    }
    static async editClient(req,res){
        const response = new ResponseWraper(res);
        try {
            const {firstName,lastName,email,phone,gender,maritalStatus,motherName,fatherName,spouse,children,birthDate,birthPlace,income,occupation,nomineeName,nomineeRelation,followUpDate,meetingDate} = req.body;
            const {id:client} = req.params;
            const clients = await Client.findByIdAndUpdate(client,{
                $set:{
                    firstName,
                    lastName,
                    email,
                    phone,
                    gender,
                    maritalStatus,
                    motherName,
                    fatherName,
                    spouse,
                    children,
                    birthDate,
                    birthPlace,
                    income,
                    occupation,
                    nomineeName,
                    nomineeRelation,
                    followUpDate,
                    meetingDate,
                }
            });
            
            // if(clients.length<=0) return response.ok('Clients not found');
            return response.ok(clients);
        } catch (error) {
            return response.internalServerError();
        }
    }

    static async getCLientsCount(req,res){
        const response = new ResponseWraper(res);
        try {

            const {month,year} = req.query;

            const countOfProspect = await Client.count({
                status:'prospect'
            });
            const countOfMeeting = await Client.count({
                status:'meeting'
            });
            const countOfFollowUpCLient = await Client.count({
                status:'follow-up'
            });
            const countOfDone = await Client.count({
                status:'done'
            });

            const pie = {
                "prospect":countOfProspect,
                "meeting":countOfMeeting,
                "follow_up":countOfFollowUpCLient,
                "done":countOfDone,
            };

            const dataWeek = [];


            const week1Start = new Date(year,month,1,0,0,0,0).toISOString();
            const week1End = new Date(year,month,7,0,0,0,0).toISOString();

            const week2Start = new Date(year,month,8,0,0,0,0).toISOString();
            const week2End = new Date(year,month,14,0,0,0,0).toISOString();

            const week3Start = new Date(year,month,15,0,0,0,0).toISOString();
            const week3End = new Date(year,month,21,0,0,0,0).toISOString();

            const week4Start = new Date(year,month,22,0,0,0,0).toISOString();
            const week4End = new Date(year,month,28,0,0,0,0).toISOString();
            
            const week5Start = new Date(year,month,22,0,0,0,0).toISOString();
            const week5End = new Date(year,month,28,0,0,0,0).toISOString();

            const countjWeek1 = await Client.count({
                joinDate: {'$gte':week1Start,'$lte':week1End},
                status:'prospect'
            });
            const countjWeek2 = await Client.count({
                joinDate: {'$gte':week2Start,'$lte':week2End},
                status:'prospect'
            });
            const countjWeek3 = await Client.count({
                joinDate: {'$gte':week3Start,'$lte':week3End},
                status:'prospect'
            });
            const countjWeek4 = await Client.count({
                joinDate: {'$gte':week4Start,'$lte':week4End},
                status:'prospect'
            });
            const countjWeek5 = await Client.count({
                joinDate: {'$gte':week5Start,'$lte':week5End},
                status:'prospect'
            });
            const countkWeek1 = await Client.count({
                joinDate: {'$gte':week1Start,'$lte':week1End},
                status:'meeting'
            });
            const countkWeek2 = await Client.count({
                joinDate: {'$gte':week2Start,'$lte':week2End},
                status:'meeting'
            });
            const countkWeek3 = await Client.count({
                joinDate: {'$gte':week3Start,'$lte':week3End},
                status:'meeting'
            });
            const countkWeek4 = await Client.count({
                joinDate: {'$gte':week4Start,'$lte':week4End},
                status:'meeting'
            });
            const countkWeek5 = await Client.count({
                joinDate: {'$gte':week5Start,'$lte':week5End},
                status:'meeting'
            });

            const countfWeek1 = await Client.count({
                followUpDate: {'$gte':week1Start,'$lte':week1End},
                status:'follow-up'
            });
            const countfWeek2 = await Client.count({
                followUpDate: {'$gte':week2Start,'$lte':week2End},
                status:'follow-up'
            });
            const countfWeek3 = await Client.count({
                followUpDate: {'$gte':week3Start,'$lte':week3End},
                status:'follow-up'
            });
            const countfWeek4 = await Client.count({
                followUpDate: {'$gte':week4Start,'$lte':week4End},
                status:'follow-up'
            });
            const countfWeek5 = await Client.count({
                followUpDate: {'$gte':week5Start,'$lte':week5End},
                status:'follow-up'
            });
            const countgWeek1 = await Client.count({
                followUpDate: {'$gte':week1Start,'$lte':week1End},
                status:'done'
            });
            const countgWeek2 = await Client.count({
                followUpDate: {'$gte':week2Start,'$lte':week2End},
                status:'done'
            });
            const countgWeek3 = await Client.count({
                followUpDate: {'$gte':week3Start,'$lte':week3End},
                status:'done'
            });
            const countgWeek4 = await Client.count({
                followUpDate: {'$gte':week4Start,'$lte':week4End},
                status:'done'
            });
            const countgWeek5 = await Client.count({
                followUpDate: {'$gte':week5Start,'$lte':week5End},
                status:'done'
            });

            const data = [
                { "week": "Week1", "type": "prospect", "value": countjWeek1 },
                { "week": "Week1", "type": "meeting", "value": countkWeek1 },
                { "week": "Week1", "type": "follow-up", "value": countfWeek1 },
                { "week": "Week1", "type": "done", "value": countgWeek1 },
                { "week": "Week2", "type": "prospect", "value": countjWeek2 },
                { "week": "Week2", "type": "meeting", "value": countkWeek2 },
                { "week": "Week2", "type": "follow-up", "value": countfWeek2 },
                { "week": "Week2", "type": "done", "value": countgWeek2 },
                { "week": "Week3", "type": "prospect", "value": countjWeek3 },
                { "week": "Week3", "type": "meeting", "value": countkWeek3 },
                { "week": "Week3", "type": "follow-up", "value": countfWeek3 },
                { "week": "Week3", "type": "done", "value": countgWeek3 },
                { "week": "Week4", "type": "prospect", "value": countjWeek4 },
                { "week": "Week4", "type": "meeting", "value": countkWeek4 },
                { "week": "Week4", "type": "follow-up", "value": countfWeek4 },
                { "week": "Week4", "type": "done", "value": countgWeek4 },
                { "week": "Week5", "type": "prospect", "value": countjWeek5 },
                { "week": "Week5", "type": "meeting", "value": countkWeek5 },
                { "week": "Week5", "type": "follow-up", "value": countfWeek5 },
                { "week": "Week5", "type": "done", "value": countgWeek5 },
                ];
            return response.ok({pie,data});
        } catch (error) {
            console.log(error);
            return response.internalServerError();
        }
    }
}

export default ClientController;