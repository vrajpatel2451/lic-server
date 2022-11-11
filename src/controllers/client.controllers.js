import FirebaseNotificationService from "../helpers/notification.helper";
import ResponseWraper from "../helpers/response.helpers";
import SearchHelper from "../helpers/searchindexing.helpers";
import { Client } from "../models/client.model";
import { DocumentClient } from "../models/document.model";
import { FieldClient } from "../models/fields.model";
import { User } from "../models/user.model";

class ClientController {
    static async createClient(req,res){
        const response = new ResponseWraper(res);
        try {
            const { firstName,email,phone,gender,maritalStatus,motherName,fatherName,spouse,children,birthPlace,income,occupation,nomineeName,nomineeRelation, lastName, policies,familyCode,meetingDate,birthDate,fields } = req.body;
            console.log(policies);
        const createdFields = await FieldClient.insertMany(fields);
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
                familyCode,
                meetingDate,
                birthDate,
                policies,
                fields:createdFields,
                followUpDate:new Date().toISOString()
            });
            const clData = await client.populate('fields');
            const dta = await new SearchHelper().addIndex(clData);
            console.log('search', dta);
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

    static async getCLientsCount(req,res){
        const response = new ResponseWraper(res);
        try {

            const {month,year} = req.query;

            const countOfJoinedCLient = await Client.count({
                status:'onboarded'
            });
            const countOfFollowUpCLient = await Client.count({
                status:'in-followup'
            });

            const pie = {
                "inFollowup":countOfFollowUpCLient,
                "onboarded":countOfJoinedCLient
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
                status:'onboarded'
            });
            const countjWeek2 = await Client.count({
                joinDate: {'$gte':week2Start,'$lte':week2End},
                status:'onboarded'
            });
            const countjWeek3 = await Client.count({
                joinDate: {'$gte':week3Start,'$lte':week3End},
                status:'onboarded'
            });
            const countjWeek4 = await Client.count({
                joinDate: {'$gte':week4Start,'$lte':week4End},
                status:'onboarded'
            });
            const countjWeek5 = await Client.count({
                joinDate: {'$gte':week5Start,'$lte':week5End},
                status:'onboarded'
            });

            const countfWeek1 = await Client.count({
                followUpDate: {'$gte':week1Start,'$lte':week1End},
                status:'in-followup'
            });
            const countfWeek2 = await Client.count({
                followUpDate: {'$gte':week2Start,'$lte':week2End},
                status:'in-followup'
            });
            const countfWeek3 = await Client.count({
                followUpDate: {'$gte':week3Start,'$lte':week3End},
                status:'in-followup'
            });
            const countfWeek4 = await Client.count({
                followUpDate: {'$gte':week4Start,'$lte':week4End},
                status:'in-followup'
            });
            const countfWeek5 = await Client.count({
                followUpDate: {'$gte':week5Start,'$lte':week5End},
                status:'in-followup'
            });

            const data = [
                { "week": "Week1", "type": "OnBoarded", "value": countjWeek1 },
                { "week": "Week1", "type": "OnFolloeup", "value": countfWeek1 },
                { "week": "Week2", "type": "OnBoarded", "value": countjWeek2 },
                { "week": "Week2", "type": "OnFolloeup", "value": countfWeek2 },
                { "week": "Week3", "type": "OnBoarded", "value": countjWeek3 },
                { "week": "Week3", "type": "OnFolloeup", "value": countfWeek3 },
                { "week": "Week4", "type": "OnBoarded", "value": countjWeek4 },
                { "week": "Week4", "type": "OnFolloeup", "value": countfWeek4 },
                { "week": "Week5", "type": "OnBoarded", "value": countjWeek5 },
                { "week": "Week5", "type": "OnFolloeup", "value": countfWeek5 },
                ];
            return response.ok({pie,data});
        } catch (error) {
            console.log(error);
            return response.internalServerError();
        }
    }
}

export default ClientController;