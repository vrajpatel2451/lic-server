import { model, Schema } from "mongoose";

const CommentSchema = new Schema({
    comment:String,
    user:{type: Schema.Types.ObjectId, ref:'User'},
    task:{type: Schema.Types.ObjectId, ref:'Task'},
});

export const Comment = model('Comment', CommentSchema);
    