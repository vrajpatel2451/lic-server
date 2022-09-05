import { model, Schema } from "mongoose";

const FieldClientSchema = new Schema({
    label:String, 
    value:String,
    type:{type:String, enum:['string','number','date-time'],default:'string'}, 
});

// module.exports = {
    export const FieldClient = model('FieldClient', FieldClientSchema);
    // export const DoClientTC = composeWithMongoose(model('DocumentClient', DocumentClientSchema));
// };