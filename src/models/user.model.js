import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { composeWithMongoose } from "graphql-compose-mongoose";

const UserSchema = new Schema({
    firstName:String,
    lastName:String,
    email:{
        type: String,
        unique:true,
        index:true,
    },
    password:String,
    contact:{type:Schema.Types.ObjectId, ref:'Contact'},
    address:{type:Schema.Types.ObjectId, ref:'Address'},
    branch:{type:Schema.Types.ObjectId, ref:'Branch'},
    role:{type:String, enum:['admin','head','staff'],default:'staff'},   
    department:[{type:Schema.Types.ObjectId, ref:'Department'}],
    workRole:[{type:Schema.Types.ObjectId, ref:'WorkRole'}],
    image:{data:Buffer, contentType:String},   
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

UserSchema.pre('save', async function encrypt(next) {
    if (this.isModified('password')) {
      const hash = await this.encryptPassword(this.password);
      this.password = hash;
    }
    return next();
  });
  
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

// module.exports = {
    export const User = model('User', UserSchema);
    export const UserTC = composeWithMongoose(model('User', UserSchema));
// };