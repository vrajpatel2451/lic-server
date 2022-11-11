import ResponseWraper from '../helpers/response.helpers';
import { Address } from '../models/address.model';
import { Branch } from '../models/branch.model';
import { Contact } from '../models/contact.model';
import { Department } from '../models/department.model';
import { User } from '../models/user.model';
import FCM from 'fcm-node';
import FirebaseNotificationService from '../helpers/notification.helper';
import { StaffLog } from '../models/log.model';
import { Task } from '../models/task.model';

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
        
        // if(branch!=''){
          const user = await User.create({
            password,
            firstName,
            email,
            lastName,
            branch,
            role,
            workRole,
            departments:department,
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

    const userData = await (await (await user.populate('contact')).populate('departments')).populate('branch')
    // .populate('department').populate('workRole').populate('branch');
        console.log("hola",userData);
      return response.created({ accessToken: user.generateToken(), user: userData });
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
          departments:department,
          $or:[
            // { branch: branch },
            { firstName: { $regex: new RegExp(`.*${name??''}.*`), $options: "i" } },
            // { role: { $regex: new RegExp(`.*${role}.*`), $options: "i" } },
          ]
        }).populate('contact').populate('departments').populate('workRole').populate('branch');
        // users = users.filter(e=>(e.branch?._id===branch && e.department?.includes() && e.role === role));
        
      }else if(department!=null && department!='' && department != undefined){
        console.log("b",department);
        users = await User.find({
          role,
          department,
          $or:[
            { firstName: { $regex: new RegExp(`.*${name ?? ''}.*`), $options: "i" } },
            // { role: { $regex: new RegExp(`.*${role}.*`), $options: "i" } },
            // { department: department },
            // { branch: { $regex: new RegExp(`.*${branch}.*`), $options: "i" } },
          ]
        }).populate('contact').populate('departments').populate('workRole').populate('branch');
      }else if(branch!=null && branch!='' && branch != undefined){
        console.log("b",branch);
        users = await User.find({
          role,
          branch,
          $or:[
            { firstName: { $regex: new RegExp(`.*${name ?? ''}.*`), $options: "i" } },
            // { role: { $regex: new RegExp(`.*${role}.*`), $options: "i" } },
            // { department: { $regex: new RegExp(`.*${department}.*`), $options: "i" } },
            // { branch: branch },
          ]
        }).populate('contact').populate('departments').populate('workRole').populate('branch');
      }else{
        console.log("no");
        users = await User.find({
          // "$match":{"firstName": name,"branch"}
          // firstName: new RegExp(name,'i')
          // role,
          $or:[
            { firstName: { $regex: new RegExp(`.*${name??''}.*`), $options: "i" } },
            // { role: { $regex: new RegExp(`.*${role??''}.*`), $options: "i" } },
            // { department: { $regex: new RegExp(`.*${department}.*`), $options: "i" } },
            // { branch: { $regex: new RegExp(`.*${branch}.*`), $options: "i" } },
          ]
        }).populate('contact').populate('departments').populate('workRole').populate('branch');
      }
      console.log(users);
      if(users==null||users.length<=0) return response.notFound('staff not found');
      return response.ok(users);
      
    } catch (error) {
      console.log('staff',error);
      return response.internalServerError();
    }

  }

  static async getStaffByWeb(req,res){
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
        }).populate('contact').populate('departments').populate('workRole').populate('branch');
        // users = users.filter(e=>(e.branch?._id===branch && e.department?.includes() && e.role === role));
        
      }else if(department!=null && department!='' && department != undefined){
        console.log("b",department);
        users = await User.find({
          role,
          department,
          $or:[
            { firstName: { $regex: new RegExp(`.*${name ?? ''}.*`), $options: "i" } },
            // { role: { $regex: new RegExp(`.*${role}.*`), $options: "i" } },
            // { department: department },
            // { branch: { $regex: new RegExp(`.*${branch}.*`), $options: "i" } },
          ]
        }).populate('contact').populate('departments').populate('workRole').populate('branch');
      }else if(branch!=null && branch!='' && branch != undefined){
        console.log("b",branch);
        users = await User.find({
          role,
          branch,
          $or:[
            { firstName: { $regex: new RegExp(`.*${name ?? ''}.*`), $options: "i" } },
            // { role: { $regex: new RegExp(`.*${role}.*`), $options: "i" } },
            // { department: { $regex: new RegExp(`.*${department}.*`), $options: "i" } },
            // { branch: branch },
          ]
        }).populate('contact').populate('departments').populate('workRole').populate('branch');
      }else{
        console.log("no");
        users = await User.find({
          // "$match":{"firstName": name,"branch"}
          // firstName: new RegExp(name,'i')
          role,
          $or:[
            { firstName: { $regex: new RegExp(`.*${name??''}.*`), $options: "i" } },
            // { role: { $regex: new RegExp(`.*${role??''}.*`), $options: "i" } },
            // { department: { $regex: new RegExp(`.*${department}.*`), $options: "i" } },
            // { branch: { $regex: new RegExp(`.*${branch}.*`), $options: "i" } },
          ]
        }).populate('contact').populate('departments').populate('workRole').populate('branch');
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
      const user = await User.findById(id).populate('contact').populate('departments').populate('workRole').populate('branch');
      let tasks = [];
      if (user.role === 'head') {
        tasks = await Task.find({
          head: user._id
        }).limit(5);
      } else if (user.role === 'staff') {
        tasks = await Task.find({
          staff: user._id
        }).limit(5);
      }
      if(user==null) return response.notFound('staff not found');
      return response.ok({user,tasks});
      
    } catch (error) {
      console.log('staff',error);
      return response.internalServerError();
    }

  }

  static async login(req, res) {
    const response = new ResponseWraper(res);
    try {
      const { email, password,fcmToken } = req.body;
      const user = await User.findOne({
        email,
    }).populate('departments').populate('branch').populate('workRole');
    if (!user) return response.unauthorized('user not available');
    
    const authenticateUser = await user.authenticate(password);
    
    if (!authenticateUser) return response.unauthorized('Invalid password');
    user.fcmToken = fcmToken;

    await user.save();
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
      console.log('myyyyy');
      // await new FirebaseNotificationService().sendNotification();
      const { userId } = req.body;
      const { fcmToken } = req.query;
      console.log('fcm',fcmToken);
      const user = await User.findById(userId).populate('departments').populate('branch').populate('workRole');
      console.log('fcm user',userId);
      user.fcmToken = fcmToken;
      await user.save();
      if (!user) return response.unauthorized('user not available');

      console.log(user);
      return response.created({ accessToken: user.generateToken(), user });
    } catch (error) {
        console.log(error);
      return response.internalServerError();
    }
  }
  static async createStaffLog(req, res) {
    const response = new ResponseWraper(res);
    try {
      const { userId,lat,long,place} = req.body;
      const log = await StaffLog.create({
        lat,
        long,
        place,
        staff:userId,
        time:new Date().toISOString()
      })
      console.log('fcm user',userId);
      return response.created(log);
    } catch (error) {
        console.log(error);
      return response.internalServerError();
    }
  }
  static async getStaffLog(req, res) {
    const response = new ResponseWraper(res);
    try {
      const {staff} = req.query;
      if(staff){
        const logByStaff = await StaffLog.find({staff}).populate('staff');
        return response.ok(logByStaff);
      }
      const log = await StaffLog.find().populate('staff');
      // console.log('fcm user',userId);
      return response.ok(log);
    } catch (error) {
        console.log(error);
      return response.internalServerError();
    }
  }
}

export default AuthController;