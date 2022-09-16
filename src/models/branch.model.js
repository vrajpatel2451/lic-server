import { model, Schema } from "mongoose";

const BranchSchema = new Schema({
    name:String,
    branchCode:{
      type:String,
      unique:true,
      index:true,
    },
    contact:{type:Schema.Types.ObjectId, ref:'Contact'},
    staff:[{type:Schema.Types.ObjectId, ref:'User'}],
    address:{type:Schema.Types.ObjectId, ref:'Address'},
    departments:[{type:Schema.Types.ObjectId, ref:'Department'}],
    clients:[{type:Schema.Types.ObjectId, ref:'Client'}],
},
{
    toJSON: {
      versionKey: false,
    },
  },
);

    export const Branch = model('Branch', BranchSchema);
