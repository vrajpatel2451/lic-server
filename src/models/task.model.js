import { composeWithMongoose } from "graphql-compose-mongoose";
import { model, Schema } from "mongoose";

const TaskSchema = new Schema({
    title:String,
    description:String,
    startTime: {type: Schema.Types.Date, default:Date.now()},
    endTime: {type: Schema.Types.Date, default:Date.now()},
    department: {type: Schema.Types.ObjectId, ref:'Department'},
    client: {type: Schema.Types.ObjectId, ref:'Client'},
    staff: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

// module.exports = {
    export const Task = model('Task', TaskSchema);
    export const TaskTC = composeWithMongoose(model('Task', TaskSchema));
// };