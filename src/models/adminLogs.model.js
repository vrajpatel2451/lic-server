import { model, Schema } from "mongoose";

const AdminLogSchema = new Schema({
    time:{type:Schema.Types.Date,default:new Date().toISOString()},
    user:{type:Schema.Types.ObjectId,ref:'User'},
    lat:{type:Number,default:0},
    place:{type:Schema.Types.String,default:'no place'},
    long:{type:Number,default:0}, 
});

export const AdminLog = model('AdminLog', AdminLogSchema);
    