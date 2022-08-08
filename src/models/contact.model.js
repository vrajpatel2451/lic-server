import { composeWithMongoose } from "graphql-compose-mongoose";
import { model, Schema } from "mongoose";

const ContactSchema = new Schema({
    phone:String,
    email:String
});

// module.exports = {
    export const Contact = model('Contact', ContactSchema);
    export const ContactTC = composeWithMongoose(model('Contact', ContactSchema));
// };