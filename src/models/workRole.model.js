import { composeWithMongoose } from "graphql-compose-mongoose";
import { model, Schema } from "mongoose";

const WorkRoleSchema = new Schema({
    name:String,   
});

// module.exports = {
    export const WorkRole = model('WorkRole', WorkRoleSchema);
    export const WorkRoleTC = composeWithMongoose(model('WorkRole', WorkRoleSchema));
// };