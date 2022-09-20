import { model, Schema } from "mongoose";

const ClientSchema = new Schema({
    firstName:String,
    lastName:String,
    familyCode:{
        type: String,
        index:true,
    },
    contact:{type:Schema.Types.ObjectId, ref:'Contact'},
    // fields:{type:Schema.Types.Map, of:String},
    line1:String,
    line2:String,
    area:String,
    city:String,
    state:String,
    pin:Number,
    birthDate:{type:Schema.Types.Date,default:new Date().toISOString()},
    meetingDate:{type:Schema.Types.Date,default:new Date().toISOString()},
    branch:{type:Schema.Types.ObjectId, ref:'Branch'},   
    documents:[{type:Schema.Types.ObjectId, ref:'DocumentClient'}],   
    policies:[{type:Schema.Types.ObjectId, ref:'Policy'}],   
    fields:[{type:Schema.Types.ObjectId, ref:'FieldClient'}],   
});

    export const Client = model('Client', ClientSchema);
