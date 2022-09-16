import { model, Schema } from "mongoose";

const WorkRoleSchema = new Schema({
    name:String,   
});
export const WorkRole = model('WorkRole', WorkRoleSchema);
    