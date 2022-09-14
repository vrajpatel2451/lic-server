import ResponseWraper from "../helpers/response.helpers";
import { WorkRole } from "../models/workRole.model";

class WrokRoleController {
    static async getWorkRoleById(req,res){
        const response = new ResponseWraper(res);
        try {
            let branch = null
            // branch = await WorkRol.findById(req.params.id).populate('contact').populate('address');
            const role = await WorkRole.findById(req.params.id);
            // console.log(branch);
            if(role==null) return response.notFound('role does not exist');
            return response.ok(role);
        } catch (error) {
            console.log(error);
            return response.internalServerError('id is not valid');
        }
    }
    static async getWorkRoles(req,res){
        const response = new ResponseWraper(res);
        try {
            const workroles = await WorkRole.find();
            
            if(workroles.length<=0) return response.notFound('WorkRoles not found');
            return response.ok(workroles);
        } catch (error) {
            return response.internalServerError();
        }
    }
}

export default WrokRoleController;