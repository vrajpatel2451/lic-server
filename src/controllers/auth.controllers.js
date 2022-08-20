import ResponseWraper from '../helpers/response.helpers';
import { Address } from '../models/address.model';
import { Branch } from '../models/branch.model';
import { Contact } from '../models/contact.model';
import { Department } from '../models/department.model';
import { User } from '../models/user.model';
import { WorkRole } from '../models/workRole.model';


class AuthController {
  static async register(req, res) {
    const response = new ResponseWraper(res);
    // console.log(req.body);
    try {
      const { email,phone, firstName,lastName,branch,role,workRole,department,image, password,line1,line2,area,city,state,pin } = req.body;
    //   const isEmailExist = await Contact.findOne({email}).exec();

      let isUserExists = false;
      if(role!='admin'){
        if( department != [] && department[0]!=null && department[0]!=''){
          // console.log(department);
          const isDepartmentExists = await Department.findById(department[0]).exec();
          if(!isDepartmentExists) return response.badRequest('Department not exist');
        }
        if( workRole != [] && workRole[0]!=null && workRole[0]!=''){
          const isWorkRoleExists = await WorkRole.findById(workRole[0]).exec();
          if(!isWorkRoleExists) return response.badRequest('WorkRole not exist');
        }
        // if( branch!=null && branch!=''){
          const isBranchExists = await Branch.findById(branch).exec();
          if(!isBranchExists) return response.badRequest('Branch not exist');
        }
          // }
          // const isBranchExists = await Branch.findById(branch).exec();
          // const isWorkRoleExists = await WorkRole.findById(workRole[0]).exec();
          // if(!isBranchExists||!isDepartmentExists||!isWorkRoleExists) return response.badRequest('Branch, Department or WorkRole does not exist');
          //   if (isEmailExist) {
            //   const contact = await Contact.findOne({ email })
            isUserExists = await User.findOne({email:email}).exec();
            //   console.log(isUserExists);
            if (isUserExists) return response.unauthorized('User already exist');
    //   }
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
        let user;
        if(branch!=''){
          user = await User.create({
            password,
            firstName,
            email,
            lastName,
            branch,
            role,
            workRole,
            department,
            image,
            contact:newContact,
            address:newAddress,
          });
        }else{
          user = await User.create({
            password,
            firstName,
            email,
            lastName,
            role,
            workRole,
            department,
            image,
            contact:newContact,
            address:newAddress,
          });
        }

    //   const user = await User.create({
    //     email,
    //     name,
    //     password,
    //   });
        console.log("hola",user);
      return response.created({ accessToken: user.generateToken(), user });
    } catch (error) {
      console.log(error);
      return response.internalServerError();
    }
  }

  static async getStaff(req,res){
    const response = new ResponseWraper(res);
    try {
      const {branch,department,name} = req.query;
      let users=[];
      console.log(name);
      if(branch!=null && branch!='' && department!=null && department!='' && branch != undefined && department != undefined){
        
        console.log("bd",branch,department);
        users = await User.find({
          // "$match":{"firstName": name,"branch"}
          // firstName: new RegExp(name,'i')
          $or:[
            { firstName: { $regex: new RegExp(`.*${name}.*`), $options: "i" } },
            { department: { $regex: new RegExp(`.*${department}.*`), $options: "i" } },
            { branch: { $regex: new RegExp(`.*${branch}.*`), $options: "i" } },
          ]
        }).populate('contact');
      }else if(department!=null && department!='' && department != undefined){
        console.log("b",department);
        users = await User.find({
          $or:[
            { firstName: { $regex: new RegExp(`.*${name}.*`), $options: "i" } },
            { department: { $regex: new RegExp(`.*${department}.*`), $options: "i" } },
            // { branch: { $regex: new RegExp(`.*${branch}.*`), $options: "i" } },
          ]
        }).populate('contact');
      }else if(branch!=null && branch!='' && branch != undefined){
        console.log("b",branch);
        users = await User.find({
          $or:[
            { firstName: { $regex: new RegExp(`.*${name}.*`), $options: "i" } },
            // { department: { $regex: new RegExp(`.*${department}.*`), $options: "i" } },
            { branch: { $regex: new RegExp(`.*${branch}.*`), $options: "i" } },
          ]
        }).populate('contact');
      }else{
        console.log("no");
        users = await User.find({
          // "$match":{"firstName": name,"branch"}
          // firstName: new RegExp(name,'i')
          $or:[
            { firstName: { $regex: new RegExp(`.*${name??''}.*`), $options: "i" } },
            // { department: { $regex: new RegExp(`.*${department}.*`), $options: "i" } },
            // { branch: { $regex: new RegExp(`.*${branch}.*`), $options: "i" } },
          ]
        }).populate('contact');
      }
      console.log(name);
      if(users==null||users.length<=0) return response.notFound('staff not found');
      return response.ok(users);
      
    } catch (error) {
      console.log('staff',error);
      return response.internalServerError();
    }

  }

  static async login(req, res) {
    const response = new ResponseWraper(res);
    try {
      const { email, password } = req.body;
      // const isEmailExist = await Contact.findOne({email}).exec();
    //   if (isEmailExist) {

    //     const contact = await Contact.findOne({ email })
    //     isUserExists = await User.findOne({ contact:contact }).exec();
    //     if (isUserExists) return response.unauthorized('User already exist');
    //  }else{
    //      return response.badRequest('Email does not exist');
    //  }
        // const contact = await Contact.findOne({email});
      const user = await User.findOne({
        email,
      });
      if (!user) return response.unauthorized('user not available');

      const authenticateUser = await user.authenticate(password);

      if (!authenticateUser) return response.unauthorized('Invalid password');
      console.log(user);
      return response.created({ accessToken: user.generateToken(), user });
    } catch (error) {
        console.log(error);
      return response.internalServerError();
    }
  }
}

export default AuthController;