import ResponseWraper from "../helpers/response.helpers";
import { Policy } from "../models/policy.model";
import { WorkRole } from "../models/workRole.model";

class PolicyController {
    static async getPolicyById(req,res){
        const response = new ResponseWraper(res);
        try {
            let branch = null
            // branch = await WorkRol.findById(req.params.id).populate('contact').populate('address');
            const policy = await Policy.findById(req.params.id);
            // console.log(branch);
            if(policy==null) return response.notFound('role does not exist');
            return response.ok(policy);
        } catch (error) {
            console.log(error);
            return response.internalServerError('id is not valid');
        }
    }
    static async getPolicies(req,res){
        const response = new ResponseWraper(res);
        try {
            const policies = await Policy.find();
            
            if(policies.length<=0) return response.notFound('Policies not found');
            return response.ok(policies);
        } catch (error) {
            return response.internalServerError();
        }
    }
    static async addPolicy(req,res){
        const response = new ResponseWraper(res);
        try {
            const {name} = req.body;
            const policy = await Policy.create({name});
            // if(policies<=0) return response.notFound('Policies not found');
            return response.ok(policy);
        } catch (error) {
            return response.internalServerError();
        }
    }
}

export default PolicyController;