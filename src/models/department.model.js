import { model, Schema } from "mongoose";

const DepartmentSchema = new Schema({
    name:{
      type: String,
      unique:true,
      index:true
    },
    branches:[{type:Schema.Types.ObjectId, ref:'Branch'}],
    staff:[{type:Schema.Types.ObjectId, ref:'User'}],
    heads:[{type:Schema.Types.ObjectId, ref:'User'}],
    clients:[{type:Schema.Types.ObjectId, ref:'Client'}],
},
{
    toJSON: {
      versionKey: false,
    },
  },
);

   export const Department = model('Department', DepartmentSchema);