import FileOperations from "../helpers/fileOperation.helpers";
import ResponseWraper from "../helpers/response.helpers";
import { mediaUploader } from "../storageconfig/s3.config";

export const uploadTaskFile = (req,res,next) => {
    const response = new ResponseWraper(res);
    new FileOperations().upload((req,file,cb)=>{
    //   if(file.mimetype==='image/png'||file.mimetype==='image/jpg' || file.mimetype === 'application/octet-stream'){
    //     cb(null,true)
    //   }else{
    //     console.log('not suported',file);
    //     cb(null,false)
    //   }
    cb(null,true)
    },
    // {
    //   fileSize:1024*1024
    // }
    ).single('taskDoc')(req,res,(err)=>{
      if(err) {
        console.log(err);
        return response.internalServerError()
      };
      req.body={...req.body,image:new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear()+'-'+new Date().getHours()+'-'+new Date().getMinutes()+'-'+req?.file?.originalname??''}
      next();
    });
  }
export const uploadTaskFileClient = (req,res,next) => {
    const response = new ResponseWraper(res);
    // new FileOperations().upload((req,file,cb)=>{
    mediaUploader.single('taskDoc')(req,res,(err)=>{
      if(err) {
        console.log(err);
        return response.internalServerError()
      };
      req.body={...req.body,taskDoc:req?.file?.location}
      next();
    });
  }