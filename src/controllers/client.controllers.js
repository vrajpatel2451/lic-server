
import FirebaseNotificationService from "../helpers/notification.helper";
import ResponseWraper from "../helpers/response.helpers";
import SearchHelper from "../helpers/searchindexing.helpers";
import { Address } from "../models/address.model";
import { Branch } from "../models/branch.model";
import { Client } from "../models/client.model";
import { Contact } from "../models/contact.model";
import { FieldClient } from "../models/fields.model";
import { User } from "../models/user.model";

class ClientController {
    static async createClient(req,res){
        const response = new ResponseWraper(res);
        try {
            const { email,phone,branch,firstName, lastName, policies,familyCode,line1,line2,area,city,state,pin,meetingDate,birthDate,fields } = req.body;
            let isBranchExist = null;
            console.log(fields);
            isBranchExist = await Branch.findById(branch);
            if(isBranchExist == null) return response.badRequest('Branch Does not Exist');
            console.log(policies);
        const newContact = await Contact.create({
            email,
            phone
        });
        const createdFields = await FieldClient.insertMany(fields);
            const client = await Client.create({
                firstName,
                lastName,
                familyCode,
                branch,
                meetingDate,
                birthDate,
                contact:newContact,
                policies,
                line1,
                line2,
                area,
                city,
                state,
                fields:createdFields,
                pin
            });
            const clData = await (await client.populate('contact')).populate('branch');
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
            return response.created(await client.populate('branch'));

        } catch (error) {
            console.log('branch error',error);
            return response.internalServerError();
        }
    }
    static async getClientById(req,res){
        const response = new ResponseWraper(res);
        try {
            // let branch = null
            const branch = await Client.findById(req.params.id).populate('contact').populate('documents');
            console.log(branch);
            if(branch==null) return response.notFound('client does not exist');
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
            const branch = await Client.findById(req.params.id).populate('contact').populate('documents');
            const clients = await Client.find({familyCode:branch.familyCode}).populate('contact').populate('documents');
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
            }).populate('contact').populate('branch').populate('fields');
            
            if(clients.length<=0) return response.notFound('Clients not found');
            return response.ok(clients);
        } catch (error) {
            return response.internalServerError();
        }
    }
}

export default ClientController;