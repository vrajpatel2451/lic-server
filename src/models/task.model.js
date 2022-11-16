import { model, Schema } from "mongoose";

const TaskSchema = new Schema({
    title:String,
    description:String,
    startTime: {type: Schema.Types.Date, default:Date.now()},
    endTime: {type: Schema.Types.Date, default:Date.now()},
    department: {type: Schema.Types.ObjectId, ref:'Department'},
    branch: {type: Schema.Types.ObjectId, ref:'Branch'},
    client: {type: Schema.Types.ObjectId, ref:'Client'},
    staff: {type: Schema.Types.ObjectId, ref: 'User'},
    head: {type: Schema.Types.ObjectId, ref: 'User'},
    documents:[{type:Schema.Types.ObjectId, ref:'DocumentClient'}],
    fields:[{type:Schema.Types.ObjectId, ref:'FieldClient'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    basicFields: [{type: Schema.Types.Map,}],
    taskType:{type:String, enum:['in-field','off-field','on-field'],default:'in-field'}, 
    taskStatus:{type:String, enum:['pending','inprogress','verify','completed'],default:'pending'},
},
{
    toJSON: {
      transform: (doc, ret) => {
        let status = 1;
                const milli = parseInt((ret.endTime - ret.startTime) / 3);
                if((ret.startTime.getTime()+milli) > Date.now()){
                    status = 1;
                }else if((ret.startTime.getTime()+(milli*2)) > Date.now()){
                    status = 2;
                }else if((ret.startTime.getTime()+(milli*3)) > Date.now()){
                    status = 3;
                }else{
                    status = 4;
                }
        let newBasicFields = ret.basicFields.map(e=>{
            console.log('rate',ret);
         return   ({...e,value:ret.client[e['name']]??''})
        }
        );
        const rest = {...ret,priority:status,basicFields:newBasicFields};
        return rest;
      },
      versionKey: false,
    },
}, 
);



export const Task = model('Task', TaskSchema);
    