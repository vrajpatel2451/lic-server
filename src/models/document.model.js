import { model, Schema } from "mongoose";

const DocumentClientSchema = new Schema({
    name:String,
    uploaded:Boolean,
    type:{type:String, enum:['image','pdf','doc'],default:'image'},
    image:String,
    client:{type:Schema.Types.ObjectId, ref:'Client'}   
});

export const DocumentClient = model('DocumentClient', DocumentClientSchema);
    