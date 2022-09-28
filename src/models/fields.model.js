import { model, Schema } from "mongoose";

const FieldClientSchema = new Schema({
    label:String, 
    value:String,
    type:{type:String, enum:['string','number','date-time'],default:'string'}, 
    update:{type:Schema.Types.Date,default:new Date().toISOString()}, 
});
 
export const FieldClient = model('FieldClient', FieldClientSchema);
   