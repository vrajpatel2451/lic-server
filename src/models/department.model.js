import { composeWithMongoose } from "graphql-compose-mongoose";
import { model, Schema } from "mongoose";

const DepartmentSchema = new Schema({
    name:String,
    branch:{type:Schema.Types.ObjectId, ref:'Branch'},
    staff:[{type:Schema.Types.ObjectId, ref:'User'}],
    head:{type:Schema.Types.ObjectId, ref:'User'},
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