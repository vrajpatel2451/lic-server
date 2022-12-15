import { JWTVerify } from '../utils/auth.util';
import ResponseWrapper from '../helpers/response.helpers';
import FileOperations from '../helpers/fileOperation.helpers';
import { mediaUploader } from '../storageconfig/s3.config';

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  const response = new ResponseWrapper(res);

  if (!authorization) {
    response.forbidden('No token provided!');
    return;
  }

  JWTVerify(authorization, (err, decoded) => {
    if (err) {
      console.log("token error",err);
      response.unauthorized('Invalid Token!');
      return;
    }
    console.log(decoded);
    const body = { ...req.body, userId: decoded.id, createRole:decoded.role };
    req.body = body;
    next();
  });
};

export const verifySuperUser = (req, res, next) => {
  const { authorization } = req.headers;
  const response = new ResponseWrapper(res);

  if (!authorization) {
    response.forbidden('No super token provided!');
    return;
  }
  const token = authorization.replace(/bearer /i, '');
  if(token === process.env.SUPER_TOKEN){ 
    next();
  }else{
    response.forbidden('Invalid super token');
    return;
  }
};

export function roleFinder (passedRole=[]){
  return (req, res, next) => {
    const response = new ResponseWrapper(res);
    const {createRole} = req.body;
    if(!createRole) return response.internalServerError('role missing');
    console.log(createRole);
    console.log(passedRole);
    console.log(createRole in passedRole);
    if(passedRole.length>0){
      if(!passedRole.includes(createRole)) return response.forbidden(`${createRole} does not have access`);
    }else if(req.params.role != createRole){
      // console.log(req.params);
       return response.forbidden(`${createRole} does not have access`);
    }else if((req.params === undefined || req.params === null) && passedRole.length <=0){
      return response.forbidden('role missing')
    }
    next();
  }
}

export function roleMaker (){
  return (req, res, next) => {
    const response = new ResponseWrapper(res);
    const {role} = req.params;
    console.log(role);
    if(!role) return response.internalServerError('role missing');
    req.body = {...req.body,createRole:role}
    next();
  }
}

export const uploadUserFile = (req,res,next) => {
  const response = new ResponseWrapper(res);
  // new FileOperations().upload((req,file,cb)=>{
  //   if(file.mimetype==='image/png'||file.mimetype==='image/jpg' || file.mimetype === 'application/octet-stream'){
  //     cb(null,true)
  //   }else{
  //     console.log('not suported',file);
  //     cb(null,false)
  //   }
  // },
  // {
  //   fileSize:1024*1024
  // }
  // )
  console.log(process.env.BUCKET_SECRET_ACCESS_KEY);
  mediaUploader.single('userPhoto')(req,res,(err)=>{
    console.log('error here',err);
    if(err) {
      return response.internalServerError()
    };
    console.log('userfile',req?.files);
    req.body={...req.body,img:req?.file?.location}
    next();
  });
}
export const uploadUserFileToServer = async(req,res,next) => {
  const response = new ResponseWrapper(res);
  // new FileOperations().upload((req,file,cb)=>{
  //   if(file.mimetype==='image/png'||file.mimetype==='image/jpg'){
  //     cb(null,true)
  //   }else{
  //     console.log('not suported',file);
  //     cb(null,false)
  //   }
  // },
  // {
  //   fileSize:1024*1024
  // }
  // ).single('userPhoto')(req,res,(err)=>{
  //   if(err) {
  //     console.log(err);
  //     return response.internalServerError()
  //   };
  //   next();
  // });
  try {
    // const imageUpload = new ImageKitOperationsOperations();
    // console.log(req.file);
    // const result = await imageUpload.uploadFile(req.file);
    // const { url } = result
    // const modifiedUrl = imageUpload.getUrl(url);
    // console.log('rs',result);
    // req.body={...req.body,img:url}
    next();
  } catch (error) {
    console.log(error);
    return response.internalServerError('image error');
  }
}

export default verifyToken;