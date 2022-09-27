import { model, Schema } from "mongoose";

const StaffLogSchema = new Schema({
    time:{type:Schema.Types.Date,default:new Date().toISOString()},
    staff:{type:Schema.Types.ObjectId,ref:'User'},
    lat:Number,
    long:Number, 
});

export const StaffLog = model('StaffLog', StaffLogSchema);
    