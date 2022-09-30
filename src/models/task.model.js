import { model, Schema } from "mongoose";

const TaskSchema = new Schema({
    title:String,
    description:String,
    startTime: {type: Schema.Types.Date, default:Date.now()},
    endTime: {type: Schema.Types.Date, default:Date.now()},
    department: {type: Schema.Types.ObjectId, ref:'Department'},
    branch: {type: Schema.Types.ObjectId, ref:'Branch'},
    client: {type: Schema.Types.ObjectId, ref:'Client'},
    staff: {type: Schema.Types.ObjectId, ref: 'User'},
    head: {type: Schema.Types.ObjectId, ref: 'User'},
    documents:[{type:Schema.Types.ObjectId, ref:'DocumentClient'}],
    fields:[{type:Schema.Types.ObjectId, ref:'FieldClient'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    taskType:{type:String, enum:['in-field','off-field','on-field'],default:'in-field'}, 
    taskStatus:{type:String, enum:['pending','inprogress','verify','completed'],default:'pending'}, 
});

export const Task = model('Task', TaskSchema);
    