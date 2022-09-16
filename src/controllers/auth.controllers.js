import ResponseWraper from '../helpers/response.helpers';
import { Address } from '../models/address.model';
import { Branch } from '../models/branch.model';
import { Contact } from '../models/contact.model';
import { Department } from '../models/department.model';
import { User } from '../models/user.model';

class AuthController {

  static async createAdmin(req,res){
    const response = new ResponseWraper(res);
    try {
      const { email,phone, firstName,lastName, password,line1,line2,area,city,state,pin,img } = req.body;
      let isUserExists = await User.findOne({email:email}).exec();
      if(isUserExists) return response.unauthorized('User already exist');
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
      const user = await User.create({
        password,
        firstName,
        email,
        lastName,
        role:'admin',
        image:img,
        contact:newContact,
        address:newAddress,
      });
      return response.created({ accessToken: user.generateToken(), user });
    } catch (error) {
      return response.internalServerError();
    }
  }

  static async register(req, res) {
    const response = new ResponseWraper(res);
    // console.log(req.body);
    try {
      const { email,phone, firstName,lastName,branch,role,workRole,department, password,line1,line2,area,city,state,pin,img } = req.body;
    //   const isEmailExist = await Contact.findOne({email}).exec();
      
      let isUserExists = false;
      console.log(req.file);
      // if(role!='admin'){
        // if( department != [] && department[0]!=null && department[0]!=''){
        //   // console.log(department);
        //   const isDepartmentExists = await Department.findById(department[0]).exec();
        //   if(!isDepartmentExists) return response.badRequest('Department not exist');
        // }
        // if( workRole != [] && workRole[0]!=null && workRole[0]!=''){
        //   const isWorkRoleExists = await WorkRole.findById(workRole[0]).exec();
        //   if(!isWorkRoleExists) return response.badRequest('WorkRole not exist');
        // }
        // if( branch!=null && branch!=''){
          console.log(branch);
          const isBranchExists = await Branch.findById(branch);
          console.log(isBranchExists);
          if(isBranchExists==null) return response.badRequest('Branch not exist');
        // }
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
        // if(branch!=''){
          user = await User.create({
            password,
            firstName,
            email,
            lastName,
            branch,
            role,
            workRole,
            department,
            image:img,
            contact:newContact,
            address:newAddress,
          });
          await isBranchExists.update({$push:{staff:user}});
          department.forEach(async e=>{
            await Department.findByIdAndUpdate(e,{$push:{staff:user}});
          });
          // Department.updateMany()
        // }else{
        //   user = await User.create({
        //     password,
        //     firstName,
        //     email,
        //     lastName,
        //     role,
        //     workRole,
        //     department,
        //     image:img,
        //     contact:newContact,
        //     address:newAddress,
        //   });
        // }

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
      const {branch,department,name,role} = req.query;
      let users=[];
      console.log(name);
      console.log(req.file);
      if(branch!=null && branch!='' && department!=null && department!='' && branch != undefined && department != undefined ){
        
        console.log("bd",branch,department);
        users = await User.find({
          // "$match":{"firstName": name,"branch"}
          // firstName: new RegExp(name,'i')
          // department,
          // branch,
          // role,
          // $where:[
          //   // {role:role},
          //   { department: department },
          // ],
          // $and:[
          // ],
          branch,
          role,
          department,
          $or:[
            // { branch: branch },
            { firstName: { $regex: new RegExp(`.*${name??''}.*`), $options: "i" } },
            // { role: { $regex: new RegExp(`.*${role}.*`), $options: "i" } },
          ]
        }).populate('contact').populate('department').populate('workRole').populate('branch');
        // users = users.filter(e=>(e.branch?._id===branch && e.department?.includes() && e.role === role));
        
      }else if(department!=null && department!='' && department != undefined){
        console.log("b",department);
        users = await User.find({
          role,
          department,
          $or:[
            { firstName: { $regex: new RegExp(`.*${name}.*`), $options: "i" } },
            // { role: { $regex: new RegExp(`.*${role}.*`), $options: "i" } },
            // { department: department },
            // { branch: { $regex: new RegExp(`.*${branch}.*`), $options: "i" } },
          ]
        }).populate('contact').populate('department').populate('workRole').populate('branch');
      }else if(branch!=null && branch!='' && branch != undefined){
        console.log("b",branch);
        users = await User.find({
          role,
          branch,
          $or:[
            { firstName: { $regex: new RegExp(`.*${name}.*`), $options: "i" } },
            // { role: { $regex: new RegExp(`.*${role}.*`), $options: "i" } },
            // { department: { $regex: new RegExp(`.*${department}.*`), $options: "i" } },
            // { branch: branch },
          ]
        }).populate('contact').populate('department').populate('workRole').populate('branch');
      }else{
        console.log("no");
        users = await User.find({
          // "$match":{"firstName": name,"branch"}
          // firstName: new RegExp(name,'i')
          // role,
          $or:[
            { firstName: { $regex: new RegExp(`.*${name??''}.*`), $options: "i" } },
            { role: { $regex: new RegExp(`.*${role??''}.*`), $options: "i" } },
            // { department: { $regex: new RegExp(`.*${department}.*`), $options: "i" } },
            // { branch: { $regex: new RegExp(`.*${branch}.*`), $options: "i" } },
          ]
        }).populate('contact').populate('department').populate('workRole').populate('branch');
      }
      console.log(users);
      if(users==null||users.length<=0) return response.notFound('staff not found');
      return response.ok(users);
      
    } catch (error) {
      console.log('staff',error);
      return response.internalServerError();
    }

  }
  static async getStaffById(req,res){
    const response = new ResponseWraper(res);
    try {
      const {id} = req.params;
      const user = await User.findById(id).populate('contact').populate('department').populate('workRole').populate('branch');
      if(user==null) return response.notFound('staff not found');
      return response.ok(user);
      
    } catch (error) {
      console.log('staff',error);
      return response.internalServerError();
    }

  }

  static async login(req, res) {
    const response = new ResponseWraper(res);
    try {
      const { email, password } = req.body;
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

  static async verifyToken(req, res) {
    const response = new ResponseWraper(res);
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);
      if (!user) return response.unauthorized('user not available');

      console.log(user);
      return response.created({ accessToken: user.generateToken(), user });
    } catch (error) {
        console.log(error);
      return response.internalServerError();
    }
  }
}

export default AuthController;