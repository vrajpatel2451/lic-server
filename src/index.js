import { devServer } from "./dev-server";
import { prodServer } from "./prod-server";

if(process.env.NODE_ENV==="dev"){
    devServer();
}else if(process.env.NODE_ENV==="prod"){
    prodServer();
}else{
    console.error('Something went wrong');
}