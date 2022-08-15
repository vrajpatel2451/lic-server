import { composeWithMongoose } from "graphql-compose-mongoose";
import { model, Schema } from "mongoose";

const DepartmentSchema = new Schema({
    name:{
      type: String,
      unique:true,
      index:true
    },
    branches:[{type:Schema.Types.ObjectId, ref:'Branch'}],
    staffs:[{type:Schema.Types.ObjectId, ref:'User'}],
    heads:[{type:Schema.Types.ObjectId, ref:'User'}],
    clients:[{type:Schema.Types.ObjectId, ref:'Client'}],
},
{
    toJSON: {
      versionKey: false,
    },
  },
);

// module.exports = {
   export const Department = model('Department', DepartmentSchema);
   export const  DepartmentTC = composeWithMongoose(model('Department', DepartmentSchema));
// };