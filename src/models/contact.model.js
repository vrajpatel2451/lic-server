import { model, Schema } from "mongoose";

const ContactSchema = new Schema({
    phone:String,
    email:String
});
 export const Contact = model('Contact', ContactSchema);
   