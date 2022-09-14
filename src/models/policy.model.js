import { composeWithMongoose } from "graphql-compose-mongoose";
import { model, Schema } from "mongoose";

const PolicySchema = new Schema({
    name:String,   
});

// module.exports = {
    export const Policy = model('Policy', PolicySchema);
    export const PolicyTC = composeWithMongoose(model('Policy', PolicySchema));
// };