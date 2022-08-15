import ResponseWraper from "../helpers/response.helpers";
import { Address } from "../models/address.model";
import { Branch } from "../models/branch.model";
import { Contact } from "../models/contact.model";

class BrnachController {
    static async createBranch(req,res){
        const response = new ResponseWraper(res);
        try {
            const { email,phone,branchCode ,name,departments,line1,line2,area,city,state,pin } = req.body;
            let isBranchExist = false;
            isBranchExist = await Branch.findOne({branchCode});
            if(isBranchExist) return response.badRequest('Branch Already Exist');
            
        const newContact = await Contact.create({
            email,
            phone
        });
        const newAddress = await Address.create({
            line1,
            line2,
            area,
            city,
            state,
            pin
        });
            const branch = await Branch.create({
                name,
                branchCode,
                contact:newContact,
                address:newAddress,
                departments,
            });

            return response.created(branch);

        } catch (error) {
            console.log('branch error',error);
            return response.internalServerError();
        }
    }
    static async getBranchById(req,res){
        const response = new ResponseWraper(res);
        try {
            let branch = null
            branch = await Branch.findById(req.params.id).populate('contact').populate('address');
            console.log(branch);
            if(branch==null) return response.notFound('branch does not exist');
            return response.ok(branch);
        } catch (error) {
            console.log(error);
            return response.internalServerError('id is not valid');
        }
    }
    static async getBranchByBranchCode(req,res){
        const response = new ResponseWraper(res);
        try {
            let branch = []
            const {branchCode,name} = req.query;
            if(branchCode!=null && branchCode!='' && name!=null && name!='' && branchCode != undefined && name != undefined){
                branch = await Branch.find({
                    $or:[
                        { branchCode: { $regex: new RegExp(`.*${branchCode??''}.*`), $options: "i" } },
                        { name: { $regex: new RegExp(`.*${name??''}.*`), $options: "i" } },
                      ]
                }).populate('contact').populate('address');
            }else if(branchCode!=null && branchCode!='' && branchCode != undefined){
                branch = await Branch.find({
                    $or:[
                        { branchCode: { $regex: new RegExp(`.*${branchCode??''}.*`), $options: "i" } },
                        // { name: { $regex: new RegExp(`.*${name??''}.*`), $options: "i" } },
                      ]
                }).populate('contact').populate('address');
            }else if(name!=null && name!='' && name != undefined){
                branch = await Branch.find({
                    $or:[
                        // { branchCode: { $regex: new RegExp(`.*${branchCode??''}.*`), $options: "i" } },
                        { name: { $regex: new RegExp(`.*${name??''}.*`), $options: "i" } },
                      ]
                }).populate('contact').populate('address');
            }else{
                branch = await Branch.find().populate('contact').populate('address');
            }
            if(branch.length<=0) return response.notFound('Branches not found');
            return response.ok(branch);
        } catch (error) {
            return response.internalServerError();
        }
    }
}

export default BrnachController;