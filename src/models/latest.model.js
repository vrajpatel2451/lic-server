import { model, Schema } from "mongoose";

const LatestSchema = new Schema({
    countNum:Number,   
});

export const Latest = model('Latest', LatestSchema);
    