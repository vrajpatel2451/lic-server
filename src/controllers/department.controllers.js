import ResponseWraper from "../helpers/response.helpers";
import { Branch } from "../models/branch.model";
import { Department } from "../models/department.model";

class DepartmentController {
    static async createDepartment(req,res){
        const response = new ResponseWraper(res);
        try {
            const { name, branch, head, staff } = req.body;
            let isBranchExist = false;
            isBranchExist = await Branch.findOne({name});
            if(isBranchExist) return response.badRequest('Branch Already Exist');
            const department = await Department.create({
                name,
                branches:branch,
                heads:head,
                staffs:staff
            });
            await Branch.findByIdAndUpdate(branch,{
                $push:{
                    departments: department
                }
            });
            return response.created(department);
        } catch (error) {
            console.log('branch error',error);
            return response.internalServerError();
        }
    }
    static async getDepartmentById(req,res){
        const response = new ResponseWraper(res);
        try {
            let department = null
            department = await Department.findById(req.params.id).populate('branches').populate({
                path:'heads',
                populate:{
                    path:'contact'
                }
            });
            console.log(department);
            if(department==null) return response.notFound('department does not exist');
            return response.ok(department);
        } catch (error) {
            console.log(error);
            return response.internalServerError('id is not valid');
        }
    }
    static async getDepartmentsByName(req,res){
        const response = new ResponseWraper(res);
        try {
            let departments = []
            const {name,branch} = req.query;
            if(branch!=null && branch!='' && name!=null && name!='' && branch!= undefined && name != undefined){
                departments = await Department.find({
                    $or:[
                        { branches: branch },
                        { name: { $regex: new RegExp(`.*${name}.*`), $options: "i" } },
                      ]
                }).populate('branches').populate({
                    path:'heads',
                    populate:{
                        path:'contact'
                    }
                });
            }else if(branch!=null && branch!='' && branch != undefined){
                departments = await Department.find({
                    $or:[
                        { branches: branch },
                        // { name: { $regex: new RegExp(`.*${name??''}.*`), $options: "i" } },
                      ]
                }).populate('branches').populate({
                    path:'heads',
                    populate:{
                        path:'contact'
                    }
                });
            }else if(name!=null && name!='' && name != undefined){
                departments = await Department.find({
                    $or:[
                        // { branchCode: { $regex: new RegExp(`.*${branchCode??''}.*`), $options: "i" } },
                        { name: { $regex: new RegExp(`.*${name??''}.*`), $options: "i" } },
                      ]
                }).populate('branches').populate({
                    path:'heads',
                    populate:{
                        path:'contact'
                    }
                });
            }else{
                departments = await Department.find().populate('branches').populate({
                    path:'heads',
                    populate:{
                        path:'contact'
                    }
                });
            }
                // departments = await Branch.find().populate('branch').populate({path:'head',populate:{
                //     path:'contact'
                // }});
            if(departments.length<=0) return response.notFound('Departments not found');
            return response.ok(departments);
        } catch (error) {
            console.log(error.message);
            return response.internalServerError();
        }
    }
}

export default DepartmentController;