import { model, Schema } from "mongoose";

const ClientSchema = new Schema({
    firstName:String,
    lastName:String,
    refrence:String,
    familyCode:{
        type: String,
        index:true,
    },
    status:{type:Schema.Types.String,enum:['prospect','meeting','follow-up','done'],default:'follow-up'},
    birthDate:{type:Schema.Types.Date,default:new Date().toISOString()},
    meetingDate:{type:Schema.Types.Date,default:new Date().toISOString()},
    joinDate:{type:Schema.Types.Date,default:new Date().toISOString()},
    followUpDate:{type:Schema.Types.Date,default:new Date().toISOString()},
    documents:[{type:Schema.Types.ObjectId, ref:'DocumentClient'}],   
    policies:[{type:Schema.Types.ObjectId, ref:'Policy'}],   
    fields:[{type:Schema.Types.ObjectId, ref:'FieldClient'}],   
});

    export const Client = model('Client', ClientSchema);
