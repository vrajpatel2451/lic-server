import { composeWithMongoose } from "graphql-compose-mongoose";
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
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    taskType:{type:String, enum:['admin','head','staff'],default:'staff'}, 
    taskStatus:{type:String, enum:['pending','inprogress','test','finished'],default:'pending'}, 
});

// module.exports = {
    export const Task = model('Task', TaskSchema);
    export const TaskTC = composeWithMongoose(model('Task', TaskSchema));
// };