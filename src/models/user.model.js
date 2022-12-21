import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const UserSchema = new Schema({
    firstName:String,
    lastName:String,
    email:{
        type: String,
        unique:true,
        index:true,
    },
    password:String,
    fcmToken:{type:Schema.Types.String,default:''},
    contact:{type:Schema.Types.ObjectId, ref:'Contact'},
    points:{type:Schema.Types.Number, default:100},
    joinDate:{type:Schema.Types.Date, default:new Date().toISOString()},
    nomineeFirstName:{type:Schema.Types.String,default:''},
    nomineeLastName:{type:Schema.Types.String,default:''},
    nomineeRelation:{type:Schema.Types.String,default:''},
    nomineePhone:{type:Schema.Types.Number,default:0},
    address:{type:Schema.Types.ObjectId, ref:'Address'},
    branch:{type:Schema.Types.ObjectId, ref:'Branch'},
    role:{type:String, enum:['admin','head','staff'],default:'staff'},   
    departments:[{type:Schema.Types.ObjectId, ref:'Department'}],
    workRole:[{type:Schema.Types.ObjectId, ref:'WorkRole'}],
    image:String,
    lat:{type:Schema.Types.Number,default:0},   
    long:{type:Schema.Types.Number,default:0},   
},
{
    toJSON: {
      transform: (doc, ret) => {
        const { password, ...rest } = ret;
        return rest;
      },
      versionKey: false,
    },
  },
);

UserSchema.pre('save',{document:true,query:false} ,async function encrypt(next) {
    // console.log('got here');
    // console.log(this.isModified('password'));
    if (this.isModified('password')) {
      console.log('got here inner');
      const hash = await this.encryptPassword(this.password);
      this.password = hash;
    }
    return next();
  });

// UserSchema.pre('findByIdAndUpdate',{document:true,query:false} ,async function encrypt(next) {
//     console.log('got here find');
//     console.log(this.isModified('password'));
//     if (this.isModified('password')) {
//       console.log('got here inner');
//       const hash = await this.encryptPassword(this.password);
//       this.password = hash;
//     }
//     return next();
//   });
  
  UserSchema.methods = {
    async authenticate(plainTextPassword) {
      try {
        return await bcrypt.compare(plainTextPassword, this.password);
      } catch (err) {
        return false;
      }
    },
    encryptPassword(password){
      return bcrypt.hash(password, bcrypt.genSaltSync(Number(process.env.SALT_SECRET)));
    },
    generateToken() {
      return jwt.sign(
        {
          firstName: this.firstName,
          lastName: this.lastName,
          role: this.role,
        //   email: this.userName,
          // eslint-disable-next-line no-underscore-dangle
          id: this._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 24 * 60 * 60,
        },
      );
    },
  };
export const User = model('User', UserSchema);
    