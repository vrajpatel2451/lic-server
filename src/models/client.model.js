import { composeWithMongoose } from "graphql-compose-mongoose";
import { model, Schema } from "mongoose";

const ClientSchema = new Schema({
    firstName:String,
    lastName:String,
    familyCode:{
        type: String,
        index:true,
    },
    contact:{type:Schema.Types.ObjectId, ref:'Contact'},
    fields:{type:Schema.Types.Map, of:String},
    address:{type:Schema.Types.ObjectId, ref:'Address'},
    branch:{type:Schema.Types.ObjectId, ref:'Branch'},   
    department:[{type:Schema.Types.ObjectId, ref:'Department'}],
    documents:[{type:Schema.Types.ObjectId, ref:'DocumentClient'}],   
});

// module.exports = {
    export const Client = model('Client', ClientSchema);
    export const ClientTC = composeWithMongoose(model('Client', ClientSchema));
// };