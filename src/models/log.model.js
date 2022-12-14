import { model, Schema } from "mongoose";

const StaffLogSchema = new Schema({
    time:{type:Schema.Types.Date,default:new Date().toISOString()},
    user:{type:Schema.Types.ObjectId,ref:'User'},
    lat:Number,
    place:{type:Schema.Types.String,default:'no place'},
    long:Number, 
});

export const StaffLog = model('StaffLog', StaffLogSchema);
    