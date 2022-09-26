import { model, Schema } from "mongoose";

const DocumentClientSchema = new Schema({
    name:String,
    uploaded:{type:Boolean,default:false},
    type:{type:String, enum:['image','pdf','doc'],default:'image'},
    image:String,
    client:{type:Schema.Types.ObjectId, ref:'Client'}   
});

export const DocumentClient = model('DocumentClient', DocumentClientSchema);
    