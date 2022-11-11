import { model, Schema } from "mongoose";

const ClientSchema = new Schema({
    firstName:String,
    lastName:String,
    refrence:String,
    email:{type:String,default:' '},
    phone:{type:Number,default:0},
    gender:{type:Schema.Types.String,enum:['male','female','other'],default:'male'},
    maritalStatus:{type:Schema.Types.String,enum:['married','unmarried','divorced','widowed'],default:'married'},
    motherName:{type:String,default:' '},
    fatherName:{type:String,default:' '},
    spouse:{type:String,default:' '},
    children:{type:Number,default:0},
    birthPlace:{type:String,default:' '},
    income:{type:Number,default:0},
    occupation:{type:String,default:' '},
    nomineeName:{type:String,default:' '},
    nomineeRelation:{type:String,default:'father'},
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
