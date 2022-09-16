import { model, Schema } from "mongoose";

const PolicySchema = new Schema({
    name:String,   
});

export const Policy = model('Policy', PolicySchema);
    