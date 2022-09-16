import { model, Schema } from "mongoose";

const AddressSchema = new Schema({
    line1:String,
    line2:String,
    area:String,
    city:String,
    state:String,
    pin:Number,
});

export const Address = model('Address', AddressSchema);
    