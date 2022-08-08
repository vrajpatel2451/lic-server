import { composeWithMongoose } from "graphql-compose-mongoose";
import { model, Schema } from "mongoose";

const CommentSchema = new Schema({
    comment:String,
    user:{type: Schema.Types.ObjectId, ref:'User'},
    task:{type: Schema.Types.ObjectId, ref:'Task'},
});

// module.exports = {
   export const Comment = model('Comment', CommentSchema);
    export const CommentTC = composeWithMongoose(model('Comment', CommentSchema));
// };