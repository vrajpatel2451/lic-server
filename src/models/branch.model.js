import { composeWithMongoose } from "graphql-compose-mongoose";
import { model, Schema } from "mongoose";

const BranchSchema = new Schema({
    name:String,
    contact:{type:Schema.Types.ObjectId, ref:'Contact'},
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
    export const BranchTC = composeWithMongoose(model('Branch', BranchSchema));
